function renderClue(clue) {
    document.querySelector("#notes").style.opacity = 1;
    // body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;
    // body.style.backgroundSize = "cover";
    document.querySelector("main").innerHTML = `
    <div class="unlockClueContainer">
        <h1>${clue.title}</h1>
        <div class="clueImage2" style="background-image: url('${clue.Clueimage}')"></div>
        <div id="picTwo"></div>
        <p>${clue.shortText}</p>
    </div>
    <button onclick="RenderClues()">Tillbaka</button>
  `;
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

    // document.querySelector("#cross").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); })
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

function RenderClues() {
    let user = JSON.parse(localStorage.getItem("user"));
    stopExecution=true;
    document.querySelector("#notes").style.opacity = 1;
    swapStyleSheet("css/clues.css");
    document.querySelector("main").innerHTML = `
      <h1>LEDTRÅDAR</h1>
      <div class="clues"></div>
    `;

    // document.querySelector(".wrapper").style.backgroundImage = "none";
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;
    // body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    // body.style.backgroundSize = "cover";

    CLUES.forEach(clue => {
        if (isClueUnlocked(clue.id)) {
            let clueBox = document.createElement("div");
            let parent = document.querySelector(".clues");
            parent.append(clueBox)
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
        let parent=clueBox.querySelector(".lockedClueContent")
            if (previousClue === 0) {
                if (user.clues.length === 0) {
                    let unlockIcon=document.createElement("i");
                    unlockIcon.setAttribute(`class`, `fa-solid fa-unlock unlock lock`);
                    parent.append(unlockIcon);

                    clueBox.querySelector(".unlock").addEventListener("click", function () {
                        unlockCluePopUp(clue.id)
                    });
                } else {
                    let unlockIcon=document.createElement("i");
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
                    
                    unlockIcon.on("click", function() {
                        unlockCluePopUp(clue.id);
                    });
                } else {
                    let unlockIcon=document.createElement("i");
                    unlockIcon.setAttribute(`class`, `fa-solid fa-lock lock`);
                    parent.append(unlockIcon);
                    console.log("Kan inte låsa upp den här ledtråden ännu.");
                }
            }
            
        }
    });

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


