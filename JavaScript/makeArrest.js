async function RenderMakeArrest() {

    stopExecution = true;
    basicHeader()

    swapStyleSheet("css/arrest.css");
    document.querySelector("#notes").style.opacity = 1;
    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;

    main.innerHTML = `
        <div class="bigBox"></div>
    `;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.done) {


        document.querySelector(".bigBox").innerHTML = `

            <h1> GISSA MISSTÄNKT</h1>
            <div class="PictureBox">
                <div id="profilePic"  style="background-image: url('Bilder/suspects/Goran.png')"></div>
            </div>

            <h3> Spelet är avklarat. Mördaren är nu fångad och frid kan återigen inta Malmö </h3>

            <div id="suspects">
                <div id="suspectBoxOne"></div>
                <div id="suspectBoxTwo"></div>
            </div>

            <button disabled> Lås in och avsluta spelet </button>
            <div id="message"></div>
        `

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

        })

        resetButtons()
        document.querySelector(".fa-handcuffs").classList.add("current-page");
        document.querySelector(".text-arrest").classList.add("current-page");

    } else {



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

        <button class="makeArrest"> Lås in och avsluta spelet </button>
        <div id="message"></div>
        `
        if(user.clues.length>=3){
            document.querySelector(".makeArrest").addEventListener("click",CheckChosenPerson)
        }else{
            document.querySelector('.makeArrest').setAttribute('disabled', '');
        }
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
                    text: "Tack vare din hjälp, kunde mördaren fångas och frid kan återigen inta Malmö. Göran Berg jobbade tidigare som kock och kan därför kopplas till den kniv som användes i mordet. Efter sin karriär som kock började Göran jobba för Uber, ett företag som är känt för att betala ut dåliga löner. Han var därav i desperat behov av pengar. Göran behövde göra allt i sin makt för att få tag i pengar, även om det betydde att hans bästa vän miste livet. Återgå till startsidan för att spela en gång till.",
                    direction: "",
                    NameOfPAge: "Startsidan",
                    NameOfEnket: "https://forms.gle/kVKgD1xSbve8XL3F8",
                    link: "RenderOptions()",
                    value: true,
                    audio: "Bilder/audio/VoiceoverEnding.mp3"
                }

                ArrestPopUp(message)
            } else {
                let message = {
                    title: "Fel svar!",
                    suspect: suspect.name,
                    text: `${suspect.id} var inte mördaren och mördaren är fortfarande på fri fot. Återgå till ledtrådarna och fortsätt att spela för att hjälpa mig sätta dit mördaren.`,
                    direction: "",
                    NameOfPAge: "Ledtrådar",
                    NameOfEnket: "",
                    link: "RenderClues()",
                    value: false,
                    audio: `Bilder/audio/Voiceover${d.suspectId}.mp3`
                }

                ArrestPopUp(message)
            }
        }
    })
}
