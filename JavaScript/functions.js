
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
        <div class="logo" onclick="RenderOptions()"></div>
        <div id="profilePicture" class="icon" onclick="RenderUserPage()"></div>
    `;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.pfp !== "") {
        document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/userIconPic.jpg')`;
    }

}

function swapStyleSheet(styleSheet) {
    document.getElementById("styles").setAttribute("href", styleSheet);
}

function ArrestPopUp(prompt) {

    // Flag to indicate if typewriter effect is running
    let typewriterRunning = true;

    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#popUpWindow").innerHTML = `
        <h2> ${prompt.title}</h2>
        <div class="content">
            <div class="pictureOfSaga" style="background-image: url('Bilder/Saga.jpg')"></div>
            <div id="first">
                <p id="firstTextSaga"></p>
            </div>
            <div id="second"> 
                <p id="instructions"></p>
                <p id="enket"></p>
                <p></p>
            </div>
        </div>
        <audio id="audioPlayer" src="${prompt.audio}" style="display: none;"></audio>
    `;

    let introText = prompt.text;
    let index = 0;

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();

    function typeWriter() {
        if (index < introText.length) {
            document.getElementById("firstTextSaga").innerHTML += introText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
            typewriterRunning = true;
        }
        else {
            typewriterRunning = false;
            setTimeout(() => {
                document.getElementById("second").innerHTML = `
                <p id="instructions"> ${prompt.direction}</p>
                <p id="link" onclick="${prompt.link}"> Till <span class="underscore"> ${prompt.NameOfPAge} </span> </p>
                <div id="enket">
                    <p></p>
                </div>
            `;

                document.querySelector("#second p:nth-child(2)").addEventListener("click", async e => {
                    let user = JSON.parse(localStorage.getItem("user"));

                    if (prompt.value) {
                        try {
                            let resourse = await fetching("api/UserDone.php", "PATCH", user);
                            let data = await resourse.json();

                            if (resourse) {

                                let localUser = {
                                    "username": data.username,
                                    "email": data.email,
                                    "pfp": data.pfp,
                                    "firstTime": data.firstTime,
                                    "done": data.done,
                                    "userId": data.userId,
                                    "notes": data.notes,
                                    "clues": data.clues
                                }

                                window.localStorage.setItem("user", JSON.stringify(localUser));
                            }
                        } catch (error) {
                            popUp(error);
                        }
                        document.querySelector("#popUp").classList.remove("hidden");
                        document.querySelector("#popUpWindow").innerHTML = `
                        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>
                        <h2> Vi vill ha just din hjälp </h2>
                        <p>
                            Hjälp oss att utveckla spelet genom att trycka på länken till vår enkät <br> <br> <span class="EnketLink"><a href="https://forms.gle/kVKgD1xSbve8XL3F8" target="_blank">https://forms.gle/kVKgD1xSbve8XL3F8</a></span>
                        </p>
                    `;
                        document.querySelector("#cross").addEventListener("click", () => {
                            document.querySelector("#popUp").classList.add("hidden");
                        });
                    }
                    else {
                        document.querySelector("#popUp").classList.add("hidden");
                    }
                });
            }, 500);


        }
    }

    typeWriter();
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
    document.querySelector(".OK").addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); document.querySelector("#popUp").classList.add("hidden") });
    // document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
}


function popUpInfo(prompt) {

    document.querySelector("#popUpWindow").innerHTML = `
         <h2> Eventuella frågor som kan uppstå </h2>
         <br>
         <p id="prompt"></p>
    `;

    document.querySelector("#popUp").classList.remove("hidden");
    prompt.forEach(x => {

        if (x.pic != "") {
            document.querySelector("#prompt").innerHTML += `
                <h3 id="tipsTitle"> ${x.tipsTitle} </h3>
                <div id="tipsText"> 
                    ${x.tipsText} 
                    <div id="picEx" style="background-image: url('${x.pic}')"> </div>
                    <p id="infoTextPic"> Exempel på ledtråd. Leta efter ett laminerat papper med röd tråd </p>
                </div>
                <br>
            `;
        } else {

            document.querySelector("#prompt").innerHTML += `
                <h3 id="tipsTitle"> ${x.tipsTitle} </h3>
                <div id="tipsText"> ${x.tipsText} </div>
                <br>
            `;
        }


    })
    document.querySelector("#prompt").style.height = "60vh";
    document.querySelector("#prompt").style.overflow = "scroll";
    document.querySelector("#prompt").style.marginTop = "0px";

    let button = document.createElement("button");
    button.textContent = "OK";
    button.classList = "OK";
    document.querySelector("#popUpWindow").append(button);
    document.querySelector(".OK").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
    // document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
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
        <br>
    `;

    switch (clue.ClueimageTwo) {
        case "Bilder/cluesPic/erikPasserKortPic.png":
            document.querySelector("#clueTwo").style.height = "60vw";
            document.querySelector("#clueTwo").style.backgroundSize = "contain";
            break;
        case "Bilder/cluesPic/mordvapen.jpg":
            document.querySelector("#clueTwo").style.height = "100vw";
            break;
        case "Bilder/cluesPic/Obduktion.png":
            document.querySelector("#clueTwo").style.height = "120vw";
            break;
        case "Bilder/cluesPic/SamtalslistaRobban.jpg":
            document.querySelector("#clueTwo").style.height = "130vw";
            document.querySelector("#clueTwo").style.backgroundSize = "contain";
            break;
        case "Bilder/cluesPic/Konversation_Klas_Goran.jpg":
            document.querySelector("#clueTwo").style.height = "130vw";
            document.querySelector("#clueTwo").style.backgroundSize = "contain";
            break;
        default:
            document.querySelector("#clueTwo").style.backgroundSize = "cover";
            break;
    }


    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#cross").addEventListener("click", e => {
        document.querySelector("#popUp").classList.add("hidden");
    })
}

function RenderPopUpPictureThird(clue) {
    document.querySelector("#popUpWindow").innerHTML = `
        <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>
        <h2> Nästa ledtrådens plats </h2>
        <div id="clueFirst" style="background-image: url('${clue.Clueimage}')"></div>
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