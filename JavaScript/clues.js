function renderClue(clue) {
    document.querySelector("#notes").style.opacity = 1;
    // body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;
    // body.style.backgroundSize = "cover";
    let mainContainer = document.querySelector("main");
    mainContainer.classList.add("slide-left");
    // Vänta en kort stund för att låta CSS-övergången utföras
    setTimeout(() => {
        mainContainer.innerHTML = `
            <div class="unlockClueContainer">
                <h1>${clue.title}</h1>
                <div class="clueImage2" style="background-image: url('${clue.Clueimage}')"></div>
                <div id="picTwo"></div>
                <p>${clue.shortText}</p>
            </div>
            <button onclick="renderClueWithSlideBack()" class="back-button">Tillbaka</button>
        `;
        // Ta bort övergångs-CSS-klassen efter att övergångseffekten är klar
        mainContainer.classList.remove("slide-left");

        document.querySelector(".clueImage2").addEventListener("click", e => {
            RenderPopUpPictureFirst(clue)
        })
        if (clue.ClueimageTwo !== "") {
            document.querySelector("#picTwo").innerHTML = `
                <p> Se ytterligare ledtråd <span> här </span> </p>
            `;

            document.querySelector("span").addEventListener("click", e => {
                RenderPopUpPictureSecond(clue)
            })
        }
    }, 300);


}
function renderClueWithSlideBack() {
    let mainContainer = document.querySelector("main");
    mainContainer.classList.add("slide-right"); // Använd slide-right klassen för spegelvänd effekt
    setTimeout(() => {
        mainContainer.classList.remove("slide-right");
        RenderClues(false); // Lägg till denna rad för att rendera ledtrådarna igen
    }, 300);
}

function handleOK(id) {
    let user = JSON.parse(localStorage.getItem("user"));

    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    let code = input1 + input2 + input3 + input4;

    let errorMessage = document.querySelector("#message");

    let codeMatch = false;
    CLUES.forEach(clue => {
        if (clue.id === id && JSON.stringify(clue.code) === code) {
            codeMatch = true;
            addClue(user.userId, clue.id);
        }
    });

    if (!codeMatch) {
        errorMessage.textContent = "Koden är fel";
    }
    ifPopup = true;
}

async function addClue(idUser, idClue) {
    let body = {
        clueId: idClue,
        userId: idUser
    };

    let errorMessage = document.querySelector("#message");

    try {
        let response = await fetching("api/clues.php", "POST", body);
        let data = await response.json();

        let localUser = {
            "username": data.username,
            "email": data.email,
            "pfp": data.pfp,
            "firstTime": data.firstTime,
            "userId": data.userId,
            "notes": data.notes,
            "clues": data.clues
        }

        window.localStorage.setItem("user", JSON.stringify(localUser));
        user = JSON.parse(localStorage.getItem("user"));

        document.querySelector("#popUp").classList.add("hidden");
        RenderClues();

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function unlockCluePopUp(id) {
    document.querySelector("#popUp").classList.remove("hidden");
    document.querySelector("#popUpWindow").innerHTML = `
    <div id="cross" style="background-image: url('Bilder/cross.png')"> </div>
      <div class="cluePopup">
          <div class="inputContainer">
              <input class="popup-input" id="input1" maxlength="1">
              <input class="popup-input" id="input2" maxlength="1">
              <input class="popup-input" id="input3" maxlength="1">
              <input class="popup-input" id="input4" maxlength="1">
          </div>
          <p id="message"></p>
          <button onclick="handleOK(${id})">OK</button>
      </div>
    `;

    document.querySelector("#cross").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); })
    var inputs = document.querySelectorAll('.popup-input');
    inputs.forEach(function (input, index) {
        input.addEventListener('input', function () {
            if (this.value.length >= this.maxLength) {
                var nextIndex = index + 1;
                if (nextIndex < inputs.length) {
                    inputs[nextIndex].focus();
                }
            }
        });
    });

    document.querySelector("#popUpBackground").addEventListener("click", e => {
        document.querySelector("#popUp").classList.add("hidden")
        ifPopup = true;
    });
}
function unlockClue() {
    document.querySelector("main").innerHTML = `
      <h1>Lås upp ledtråd</h1>
      <div class="unlockClueContainer">
          <div class="unlockImage"></div>
          <p>Lås upp ledtråd genom att följa pilarna på kartan och skriv in den fyrsiffriga koden.</p>
          <div class="buttonContainer">
              <div class="unlockClue" onclick="unlockCluePopUp()">Jag har en kod</div>
              <div class="unlockClue">Ta mig till kartan</div>
          </div>
      </div>
    `;
}

function RenderClues(value) {
    let user = JSON.parse(localStorage.getItem("user"));
    stopExecution = true;
    document.querySelector("#notes").style.opacity = 1;

    basicHeader()

    if (user.pfp !== "") {
        document.querySelector("#profilePicture").style.backgroundImage = `url('${user.pfp}')`;
    } else {
        document.querySelector("#profilePicture").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
    }
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

    let main = document.querySelector("main");

    if (value) {

        document.querySelector("main").style.height = "84vh";
        main.classList.add("slide-left");
        setTimeout(() => {

            swapStyleSheet("css/clues.css");
            main.innerHTML = `
                <h1>LEDTRÅDAR</h1>
                <div class="clues"></div>
            `;

            document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

            CLUES.forEach(clue => {
                let clueBox = document.createElement("div");
                let parent = document.querySelector(".clues");
                parent.append(clueBox)
                if (isClueUnlocked(clue.id)) {
                    clueBox.setAttribute("class", "clueBox unlocked");
                    clueBox.style.backgroundImage = `url('${clue.Clueimage}')`;
                    clueBox.innerHTML = `
                    <div class="clueContent unlockedClueContent">
                        <h2>${clue.title}</h2>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                `;

                    clueBox.addEventListener("click", function () {
                        parent.classList.add("swiped");

                        setTimeout(() => {
                            parent.classList.remove("swiped");
                        }, 300);
                        renderClue(clue);
                    });
                } else {
                    clueBox.setAttribute(`class`, `clueBox locked clue${clue.id}`);
                    clueBox.style.backgroundImage = `url('${clue.Clueimage}')`;
                    clueBox.innerHTML = `
                    <div class="lockedOverlay">
                        
                        <div class="clueContent lockedClueContent">
                            <h2>Ledtråd ${clue.id}</h2>
                        </div>
                    </div>
                `;
                    let previousClue = clue.id - 1;
                    let parent = clueBox.querySelector(".lockedClueContent")
                    if (previousClue === 0) {
                        if (user.clues.length === 0) {
                            let unlockIcon = document.createElement("i");
                            unlockIcon.setAttribute(`class`, `fa-solid fa-unlock unlock lock`);
                            parent.append(unlockIcon);

                            clueBox.querySelector(".unlock").addEventListener("click", function () {
                                unlockCluePopUp(clue.id)
                            });
                        } else {
                            let unlockIcon = document.createElement("i");
                            unlockIcon.setAttribute(`class`, `fa-solid fa-lock lock`);
                            parent.append(unlockIcon);
                        }
                    } else {
                        if (user.clues.includes(previousClue)) {
                            let unlockIcon = document.createElement("i");
                            unlockIcon.setAttribute(`class`, `fa-solid fa-unlock unlock lock`);
                            parent.append(unlockIcon);

                            clueBox.querySelector(".unlock").addEventListener("click", function () {
                                unlockCluePopUp(clue.id)
                            });
                        } else {
                            let unlockIcon = document.createElement("i");
                            unlockIcon.setAttribute(`class`, `fa-solid fa-lock lock`);
                            parent.append(unlockIcon);
                        }
                    }

                }
            });
            main.classList.remove("slide-left");

        }, 300);

    } else {
        swapStyleSheet("css/clues.css");
        document.querySelector("main").style.height = "84vh";
        main.innerHTML = `
            <h1>LEDTRÅDAR</h1>
            <div class="clues"></div>
        `;

        document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

        CLUES.forEach(clue => {
            let clueBox = document.createElement("div");
            let parent = document.querySelector(".clues");
            parent.append(clueBox)
            if (isClueUnlocked(clue.id)) {
                clueBox.setAttribute("class", "clueBox unlocked");
                clueBox.style.backgroundImage = `url('${clue.Clueimage}')`;
                clueBox.innerHTML = `
            <div class="clueContent unlockedClueContent">
                <h2>${clue.title}</h2>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        `;

                clueBox.addEventListener("click", function () {
                    renderClue(clue);
                });
            } else {
                let clueBox = document.createElement("div");
                document.querySelector(".clues").append(clueBox)
                clueBox.setAttribute(`class`, `clueBox locked clue${clue.id}`);
                clueBox.style.backgroundImage = `url('${clue.Clueimage}')`;
                clueBox.innerHTML = `
            <div class="lockedOverlay">
                
                <div class="clueContent lockedClueContent">
                    <h2>Ledtråd ${clue.id}</h2>
                </div>
          </div>
        `;
                let previousClue = clue.id - 1;
                let parent = clueBox.querySelector(".lockedClueContent")
                if (previousClue === 0) {
                    if (user.clues.length === 0) {
                        let unlockIcon = $('<i>').addClass('fa-solid fa-unlock unlock lock');

                        $(parent).append(unlockIcon);

                        var times = 80;
                        var duration = 300;
                        for (var i = 0; i < times; i++) {
                            unlockIcon.animate({
                                rotate: '-10deg' // Twist to the left
                            }, duration)
                                .animate({
                                    rotate: '10deg' // Twist to the right
                                }, duration)

                        }

                        unlockIcon.on("click", function () {
                            unlockCluePopUp(clue.id);
                        });
                    } else {
                        let unlockIcon = document.createElement("i");
                        unlockIcon.setAttribute(`class`, `fa-solid fa-lock lock`);
                        parent.append(unlockIcon);
                        console.log("Kan inte låsa upp den här ledtråden ännu.");
                    }
                } else {
                    if (user.clues.includes(previousClue)) {
                        let unlockIcon = $('<i>').addClass('fa-solid fa-unlock unlock lock');

                        $(parent).append(unlockIcon);

                        var times = 80;
                        var duration = 300;
                        for (var i = 0; i < times; i++) {
                            unlockIcon.animate({
                                rotate: '-10deg' // Twist to the left
                            }, duration)
                                .animate({
                                    rotate: '10deg' // Twist to the right
                                }, duration)

                        }

                        unlockIcon.on("click", function () {
                            unlockCluePopUp(clue.id);
                        });
                    }
                }

            }
        });

    }

    function isClueUnlocked(clueId) {
        let user = JSON.parse(localStorage.getItem("user"));
        let isUnlocked = false;
        user.clues.forEach(clue => {
            if (clueId === clue) {
                isUnlocked = true;
            }
        });
        return isUnlocked;
    }
    resetButtons()
    document.querySelector(".fa-clipboard-question").classList.add("current-page");
    document.querySelector(".text-clue").classList.add("current-page");
    document.querySelector("#notes").style.opacity = 1;
}


