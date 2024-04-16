function handleOK() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    let code = input1 + input2 + input3 + input4;

    let errorMessage = document.querySelector("#message");

    let id = 2;
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
}

async function addClue(idUser, idClue) {
    let body = {
        clueId: idClue,
        userId: idUser
    };

    try {
        let response = await fetching("api/clues.php", "POST", body);
        let data = await response.json();

        if (!response.ok) {
            errorMessage.innerHTML = `<span>${data.message}</span>.`;
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            user = data;
            console.log(data);
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        document.querySelector("#popUp").classList.add("hidden");
    }
}

function unlockCluePopUp() {
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
          <button onclick="handleOK()">OK</button>
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

    document.querySelector("#cross").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden"); })
    document.querySelector("#popUpBackground").addEventListener("click", e => { document.querySelector("#popUp").classList.add("hidden") });
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
    swapStyleSheet("css/clues.css");
    document.querySelector("main").innerHTML = `
      <h1>Ledtrådar</h1>
      <div class="unlockClue" onclick="unlockClue()">Lås upp ledtråd</div>
      <div class="clues"></div>
    `;

    // console.log(user)

    let main = body.querySelector("main");

    body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    body.style.backgroundSize = "cover";

    CLUES.forEach(clue => {
        if (isClueUnlocked(clue.id)) {
            let clueBox = document.createElement("div");
            let parent = document.querySelector(".clues");
            parent.append(clueBox)
            clueBox.setAttribute("class", "clueBox unlocked")
            clueBox.innerHTML = `
          <div class="clueContent">
              <h2>${clue.title}</h2>
              <p id="info">${clue.shortText}</p>
          </div>
          <div id="cluePicture" style="background-image: url('${clue.image}')"></div>
        `;
            clueBox.addEventListener("click", () => {
                document.querySelector("main").innerHTML = `
            <h1>${clue.title}</h1>
            <div class="unlockClueContainer">
                <div class="clueImage2" style="background-image: url('${clue.image}')"></div>
                <p>${clue.shortText}</p>
                <button onclick="RenderClues()">Fortsätt</button>
            </div>
          `;
            })
        } else {
            let clueBox = document.createElement("div");
            document.querySelector(".clues").append(clueBox)
            clueBox.setAttribute("class", "clueBox locked")
            clueBox.innerHTML = `
          <div class="overlay"></div>
          <h2>Ledtråden låst</h2>
        `;
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
}

