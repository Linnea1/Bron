async function RenderMakeArrest() {

    stopExecution = true;
    basicHeader()

    swapStyleSheet("css/arrest.css");
    document.querySelector("#notes").style.opacity = 1;

    // document.querySelector(".wrapper").style.backgroundImage = "none";

    // body.style.backgroundImage = `url('Bilder/clueBackground.jpg')`;
    // body.style.backgroundSize = "cover";
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

    main.innerHTML = `
        <div class="bigBox"></div>
    `;

    document.querySelector(".bigBox").innerHTML = `

        <h1> GISSA MISSTÄNKT</h1>
        <div class="PictureBox">
            <div id="profilePic"></div>
        </div>

        <h3> Är du redo att ta fast mördaren? Gör ditt slutgiltiga val här </h3>

        <div id="suspects">
            <div id="suspectBoxOne"></div>
            <div id="suspectBoxTwo"></div>
        </div>

        <button onclick="CheckChosenPerson()"> Lås in och avsluta spelet </button>
        <div id="message"></div>
    `
    document.querySelector("#profilePic").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;

    let count = 0;

    SUSPECTS.forEach(suspect => {
        count++
        let divDom = document.createElement("div");
        divDom.classList.add("suspectBox");
        divDom.setAttribute("id", suspect.name)
        if (count <= 3) {
            document.querySelector("#suspectBoxOne").append(divDom);
        } else {
            document.querySelector("#suspectBoxTwo").append(divDom);
        }
        divDom.innerHTML = `
            <div class="Pic" style="background-image: url('${suspect.image}')"></div>
            <p> ${suspect.name} </p>
        `;

        divDom.addEventListener("click", e => {
            let wantedPerson = e.currentTarget;

            document.querySelectorAll('.suspectBox').forEach(box => {
                let wantedPersonPicture = box.querySelector(".Pic")
                if (box !== wantedPerson) {
                    wantedPersonPicture.classList.remove('chosen');
                }
            });

            wantedPerson.querySelector(".Pic").classList.toggle("chosen");

            let selectedSuspect = document.querySelector(".chosen");

            if (!selectedSuspect) {
                document.querySelector("#profilePic").style.backgroundImage = `url('Bilder/360_F_303991942_n0GmMYFyNkDGlhvzF6605BSK9mYBXX6B.jpg')`;
            } else {

                SUSPECTS.forEach(person => {
                    if (person.name === wantedPerson.id) {
                        document.querySelector("#profilePic").style.backgroundImage = `url('${person.image}')`
                    }
                })
            }

        });

    })
    resetButtons()
    document.querySelector(".fa-handcuffs").classList.add("current-page");
    document.querySelector(".text-arrest").classList.add("current-page");

}

function CheckChosenPerson(parent) {
    let chosenSuspect = document.querySelector(".chosen");
    if (chosenSuspect === null) {
        document.querySelector("#message").textContent = "Du måste välja en person";
    } else {
        document.querySelector("#message").textContent = "";
        let parent = chosenSuspect.parentElement;
        RenderAnswere(parent)
    }
}


function RenderAnswere(suspect) {

    let suspectName = suspect.id

    SUSPECTS.forEach(d => {
        let name = d.name;
        if (name === suspectName) {

            if (d.guilty === true) {
                let message = {
                    title: "Rätt svar!",
                    text: "Tack vare din hjälp, kunde mördaren fångas och frid kan återigen inta Malmö.",
                    direction: "Du har nu klarat av spelet. Återgå till startsidan för att spela en gång till",
                    NameOfPAge: "Hem",
                    NameOfEnket: "https://forms.gle/kVKgD1xSbve8XL3F8",
                    link: "RenderOptions()"
                }

                ArrestPopUp(message)
            } else {
                let message = {
                    title: "Fel svar!",
                    suspect: suspect.name,
                    text: `${suspect.id} var inte mördaren och  mördaren är fortfarande på fri fot.`,
                    direction: "Återgå till ledtrådarna och fortsätt att spela för att hjälpa mig sätta dit mördaren.",
                    NameOfPAge: "Ledtrådar",
                    NameOfEnket: "",
                    link: "RenderClues()"
                }

                ArrestPopUp(message)
            }
        }
    })
}
