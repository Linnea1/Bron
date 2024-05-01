function renderLoginPage() {
    swapStyleSheet("css/login.css");
    let main = document.querySelector("main");
    let body = document.querySelector("body");
    main.innerHTML = `

        <h2 class="title">Bron</h2>
        <div>
            <div id="infoText">
                <h2> LOGGA IN </h2>
            </div>

            <form id="loginForm">
                <label> Användarnamn</label>
                <input type=text id=username>
                <label> Lösenord</label>
                <input type=password id=password>
            </form>

            <p id=message></p>

            <div class="buttons">
                <button id="login">Logga in</button>
                <div id=register>Är du ny här? Registrera dig <span> här </span> </div>
            </div>
        </div>
    `;

    main.querySelector("#register").addEventListener("click", renderRegisterPage);

    let username = main.querySelector("#username");
    let password = main.querySelector("#password");

    function toggleFullscreen() {
        body.requestFullscreen();
    }

    main.querySelector("#login").addEventListener("click", toggleFullscreen)
    main.querySelector("#login").addEventListener("click", async function (event) {
        event.preventDefault();
        let errorMessage = main.querySelector("#message");

        let body = {
            username: username.value,
            password: password.value,
        };

        try {
            let response = await fetching("api/login.php", "POST", body);
            let data = await response.json();

            let pfp;
            if (data.pfp === "") {
                pfp = "";
            } else {
                pfp = data.pfp
            }

            let localUser = {
                "username": data.username,
                "email": data.email,
                "pfp": pfp,
                "firstTime": data.firstTime,
                "userId": data.userId,
                "notes": data.notes,
                "clues": data.clues
            }

            data.password = password.value;

            if (!response.ok) {
                errorMessage.innerHTML = `<span>${data.message}</span>.`;
            } else {
                window.localStorage.setItem("user", JSON.stringify(localUser));
                RenderIntro()
            }
        } catch (error) {
            errorMessage.textContent = `Error: ${error.message}`;
        }
    });
}