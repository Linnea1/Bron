async function RenderUserPage() {
    let user = JSON.parse(localStorage.getItem("user"));

    swapStyleSheet("css/profile.css");

    // document.querySelector("header").style.opacity = 0;
    document.querySelector("#profilePicture").style.backgroundImage = "none";

    body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    body.style.backgroundSize = "cover";

    main.innerHTML = `
        <div class="bigBox"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    body.querySelector("nav").innerHTML = `${stickyNav()}`;

    document.querySelector(".bigBox").innerHTML = `
        <h2> Profil </h2>
        <div class="PictureBox">
            <div id="profilePic"></div>
            <div id="edit" onclick="RenderChangeProfilePicture()"  style="background-image: url('Bilder/edit.png')"></div>
        </div>

        <h2> ${user.username}</h2>

        <div id="emailHolder">
            <p>Byt mailadress</p>
            <input type="text" placeholder="Ny email" name="email">
        </div>

        <div id="passwordHolder">
            <p>Byt lösenord</p>
            <input type="password" placeholder="Befintligt lösenord" name="passwordold" autocomplete="off" id="passwordold">
            <input type="password" placeholder="Nytt lösenord" name="passwordnew">
        </div>

        <div id="message"></div>

        <button id="save"> Spara ändringar</button>
        <div class="smallButtons">
            <button id="logout" onclick="logout()"> Logga ut </button>
            <button id="delete"> Radera konto</button>
        </div>
    `;

    if (user.pfp !== "") {
        document.querySelector("#profilePic").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePic").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
    }

    let saveButton = main.querySelector("#save");

    saveButton.addEventListener("click", e => {

        e.stopPropagation();
        e.preventDefault();

        let username = user.username;
        let newEmail = main.querySelector('input[name="email"]').value;
        let newPassword = main.querySelector('input[name="passwordnew"]').value;
        let oldPassword = main.querySelector('input[name="passwordold"]').value;


        let changesInForm = {
            "username": username,
            "email": newEmail,
            "currentPassword": oldPassword,
            "newPassword": newPassword,
        };

        if (newEmail === "" && oldPassword === "" && newPassword === "") {
            main.querySelector("#message").textContent = "Please fill in to change";
        } else {

            ChangeSettings(changesInForm);
        }
    })

    main.querySelector("#delete").addEventListener("click", e => {
        document.querySelector("#popUpWindow").innerHTML = `
            <p id="prompt"></p>
        `;

        document.querySelector("#popUp").classList.remove("hidden");
        document.querySelector("#prompt").textContent = "Are you sure";

        let firstButton = document.createElement("button");
        let secondButton = document.createElement("button");

        firstButton.textContent = "Yes";
        secondButton.textContent = "No";

        firstButton.classList = "firstButton";
        secondButton.classList = "secondButton";

        document.querySelector("#popUpWindow").append(firstButton);
        document.querySelector("#popUpWindow").append(secondButton);
        document.querySelector(".firstButton").addEventListener("click", e => {
            document.querySelector("#popUp").classList.add("hidden");
            deleteAccount();
        });
        document.querySelector(".secondButton").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
        document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });

    });

    async function ChangeSettings(data) {

        let body = {
            "username": data.username,
            "email": data.email,
            "currentPassword": data.currentPassword,
            "newPassword": data.newPassword,
        };

        try {

            let response = await fetching("api/settings.php", "PATCH", body);
            let resourse = await response.json();
            localStorage.setItem("user", JSON.stringify(user));

            if (response.status === 200) {
                main.querySelector("#message").textContent = "Successfully saved!";
                localStorage.setItem("user", JSON.stringify(resourse));
            }
            if (response.status === 400) {
                console.log(resourse);
                main.querySelector("#message").textContent = resourse.message;
            }
        } catch (e) {
            main.querySelector("#message").textContent = e;
        }
    }

}

async function RenderChangeProfilePicture() {

    swapStyleSheet("css/changeProfilePic.css");

    let user = JSON.parse(localStorage.getItem("user"));

    main.innerHTML = `
        <div class="bigBox"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    main.querySelector(".bigBox").innerHTML = `

        <h2> Byt profilbild </h2>
        <div class="PictureBox">
            <div id="profilePic"></div>
        </div>

        <div id="pfpHolder">
            <form id="uploadPfp">
                <label for="pfp">Välj en fil...</label>
                <input type="file" id="pfp" name="pfp">
                <button id="upload" type="submit">Ladda upp</button>
            </form>
            <button id="back" onclick="RenderUserPage()"> Tillbaka </button>
            <div id="message"></div>
        </div>
    `;

    if (user.pfp !== "") {
        document.querySelector("#profilePic").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePic").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
    }

    let fileForm = main.querySelector("#uploadPfp");
    let pfpLabel = main.querySelector("label");
    fileForm.addEventListener("submit", changePfp);

    async function changePfp(e) {

        let user = JSON.parse(localStorage.getItem("user"));
        e.preventDefault();

        let formData = new FormData(fileForm);
        formData.append("username", user.username);
        formData.append("password", user.password);
        if (user.pfp) {
            formData.append("old", user.pfp);
        }
        if (main.querySelector('input[name="pfp"]').value === "") {
            popUp("Please upload a file");
            pfpLabel.classList.remove("selected");
        } else {
            const request = new Request("api/settings.php", {
                method: "POST",
                body: formData
            });

            try {
                const response = await fetch(request);
                const data = await response.json();

                if (!response.ok) {
                    main.querySelector("#message").textContent = data.message;
                } else {
                    user.pfp = data;
                    localStorage.setItem("user", JSON.stringify(user));

                    main.querySelector("#message").textContent = "Successfully saved!";
                    document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
                    main.querySelector("#profilePic").style.backgroundImage = `url('${user.pfp}')`;
                }
            } catch (e) {
                main.querySelector("#message").textContent = e;
            }
        }
    }
}

async function change(body, URL, method, select, newValue) {
    try {
        let response = await fetching(URL, method, body);
        let data = await response.json();

        if (response.status == 200) {
            let storage = JSON.parse(localStorage.getItem("user"));
            storage[select] = newValue;
            localStorage.setItem("user", JSON.stringify(storage));

            popUp(data.message);

            document.querySelector("#popUpBackground").addEventListener("click", backToProfile);
            document.querySelector(".OK").addEventListener("click", backToProfile);
        } else {
            popUp(data.message);
        }
    } catch (error) {
        popUp(error);
    }
}


async function changeEmail(e) {
    if (newEmail.value === "") {
        popUp("Please do not leave an empty field");
    } else {
        let body = {
            email: JSON.parse(localStorage.getItem("user")).email,
            new_email: newEmail.value,
            password: JSON.parse(localStorage.getItem("user")).password
        };

        await change(body, "api/settings.php", "PATCH", "email", newEmail.value);
    }
}

async function changePassword(e) {
    if (newPassword.value === "" || oldPassword.value === "") {
        popUp("Please do not leave any empty fields");
    } else {
        let body = {
            password: oldPassword.value,
            new_password: newPassword.value,
            username: JSON.parse(localStorage.getItem("user")).username
        };

        await change(body, "api/settings.php", "PATCH", "password", newPassword.value);
    }
}

async function deleteAccount() {
    let body = {
        username: user.username,
        password: user.password
    };

    try {
        let response = await fetching("api/settings.php", "DELETE", body);
        if (response.ok) {
            logout();
        } else {
            let data = await response.json();
            popUp(data.message);
        }
    } catch (error) {
        popUp(error);
    }
}
