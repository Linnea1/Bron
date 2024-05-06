function toggleFullscreen() {
    body.requestFullscreen();
}

async function fetching(URL, method, body) {
    let response = await fetch(URL, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return response;
}

function basicHeader() {

    document.querySelector("header").innerHTML = ` 
        <div id="profilePicture" class="icon" onclick="RenderUserPage()"></div>
    `;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.pfp !== "") {
        document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
    }

}

function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}


function ArrestPopUp(prompt) {
    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#popUpWindow").innerHTML = `
        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>

        <h2> ${prompt.title}</h2>
        <div class="content">
            <div class="pictureOfSaga" style="background-image: url('Bilder/Saga.jpg')"></div>
                <div id="first">
                    <p>Saga:</p> 
                    <p>${prompt.text}</p>
                </div>
                <div id="second"> 
                    <p> ${prompt.direction}</p>
                    <p onclick="${prompt.link}"> Till <span class="underscore"> ${prompt.NameOfPAge} </span> </p>
                </div>
        </div>

    `;

    document.querySelector("#cross").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); })
    document.querySelector("#second p:nth-child(2)").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); });
    document.querySelector("span").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); });
    document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
}

function popUp(prompt) {

    document.querySelector("#popUpWindow").innerHTML = `
         <p id="prompt"></p>
    `;

    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#prompt").textContent = prompt;

    let button = document.createElement("button");
    button.textContent = "OK";
    button.classList = "OK";
    document.querySelector("#popUpWindow").append(button);
    document.querySelector(".OK").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
    document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
}

function CluePopUp(id) {
    ifPopup = false;
    document.querySelector("#popUpWindow").innerHTML = `
        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>

        <h2> Ledtråd ${id} befinner sig i din närhet! </h2>
        <div> Du kan nu låsa upp ledtråden med hjälp av en kod som finns på plats.</div>
        <br>
        <div> Klicka <span class="underscore" onclick="unlockCluePopUp(${id})" id="GoTo">här</span> för att låsa upp ledtråd nummer ${id}</div>
        <br>
    `;

    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#cross").addEventListener("click", e => {
        document.querySelector("#popUp").classList.add("hidden");
        ifPopup = true;
    })
}

function logout() {
    document.querySelector("main").innerHTML = ``;
    document.querySelector(".sticky-nav").style.opacity = 0;
    document.querySelector("#notes").style.opacity = 0;
    localStorage.clear();
    renderStartPage();
    location.reload();
}

function resetButtons() {
    var navBoxes = document.querySelectorAll('.nav-box');
    navBoxes.forEach(function (navBox) {

        var children = navBox.children;


        for (var i = 0; i < children.length; i++) {

            children[i].classList.remove('current-page');
        }
    });
}


function RenderPopUpPictureFirst(clue) {
    document.querySelector("#popUpWindow").innerHTML = `
        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>
        <h2> Ledtrådens plats </h2>
        <div id="clueFirst" style="background-image: url('${clue.Clueimage}')"></div>
        <p id="clueTwoText"> ${clue.ClueText} </p>
        <br>
    `;


    if (clue.Clueimage === "Bilder/cluesPic/camera.jpg") {
        document.querySelector("#clueFirst").style.height = "60vw";
    } else {
        document.querySelector("#clueFirst").style.height = "120vw";
    }

    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#cross").addEventListener("click", e => {
        document.querySelector("#popUp").classList.add("hidden");
    })
}


function RenderPopUpPictureSecond(clue) {
    document.querySelector("#popUpWindow").innerHTML = `
        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>
        <h2> Ytterligare ledtråd</h2>
        <div id="clueTwo" style="background-image: url('${clue.ClueimageTwo}')"></div>
        <p id="clueTwoText"> ${clue.shortTextTwo} </p>
        <br>
    `;

    if (clue.ClueimageTwo === "Bilder/cluesPic/erikPasserKortPic.png") {
        document.querySelector("#clueTwo").style.height = "60vw";
    }
    // else {
    //     document.querySelector("#clueTwo").style.height = "130vw";
    // }

    if (clue.ClueimageTwo === "Bilder/cluesPic/mordvapen.jpg") {
        document.querySelector("#clueTwo").style.height = "100vw";
    }

    if (clue.ClueimageTwo === "Bilder/cluesPic/Obduktion.png") {
        document.querySelector("#clueTwo").style.height = "130vw";
    }


    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#cross").addEventListener("click", e => {
        document.querySelector("#popUp").classList.add("hidden");
    })
}