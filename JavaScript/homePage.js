let body = document.querySelector("body");

async function renderHomePage() {
    let user = JSON.parse(localStorage.getItem("user"));
    let username = user.username


    RenderIntro()

    // RenderSuspects()

}

function RenderIntro() {
    basicHeader()
    let main = body.querySelector("main");
    body.style.backgroundImage = `url('Bilder/Skärmavbild 2024-04-08 kl. 09.53.02.png')`;
    body.style.backgroundSize = "cover";
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.position = "absolute"

    document.querySelector("main").innerHTML = `
        <div id="SagaIntro">
            <h2> Saga: </h2>
            <h3> Tack så mycket för att du hjälper mig med utredningen. Din information är ovärderlig för vårat arbete.

            Så här mycket vet vi hittills: offret heter Klas och han blev mördad  sent på natten igår. Varje liten bit information kan vara den pusselbit  vi behöver för att lösa fallet. </h3>
        </div>

        <button id="next" onclick="RenderHomePage()"> Nästa </button>
    `;
}

function RenderHomePage() {
    console.log("hej");
}

function RenderSuspects() {

    let main = body.querySelector("main");

    main.style.backgroundImage = `url('Bilder/Skärmavbild 2024-04-08 kl. 09.50.53.png')`;
    main.style.backgroundSize = "cover";

    let evenOrOdd = 0;

    main.innerHTML = `
        <div class="suspects"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    SUSPECTS.forEach(clue => {
        let SuspectxBox = document.createElement("div");
        document.querySelector(".suspects").append(SuspectxBox)
        SuspectxBox.setAttribute("id", "suspectBox")
        SuspectxBox.innerHTML = `
            <div id="info">
                <div id ="PicNameAndAge">
                </div>
                <div id ="text"></div>
            </div>
        `;


        evenOrOdd++
        if (evenOrOdd %= 2) {
            SuspectxBox.classList.add("odd");
            SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                <div id ="suspectPicture"></div>
                <div id ="NameAndAge"></div>
            `;
        } else {
            SuspectxBox.classList.add("even");
            SuspectxBox.querySelector("#PicNameAndAge").innerHTML = `
                <div id ="NameAndAge"></div>
                <div id ="suspectPicture"></div>
            `;
        }


        let pic = SuspectxBox.querySelector("#suspectPicture");
        pic.style.backgroundImage = `url('${clue.image}')`;
        pic.style.height = "105px";
        pic.style.width = "105px";
        pic.style.backgroundSize = "cover";
        pic.style.borderRadius = "50px";


        for (const index in clue) {

            if (index === "suspectId" || index === "image" || index === "guilty") {
                continue;
            }


            switch (index) {
                case "name":
                    SuspectxBox.querySelector("#NameAndAge").innerHTML += `
                        <h2 id="${index}">${clue[index]}, </h2>
                    `;
                    break;

                case "age":
                    SuspectxBox.querySelector("#NameAndAge").textContent += `
                        ${clue[index]} år
                    `;
                    break;

                case "text":
                    SuspectxBox.querySelector("#text").innerHTML += `
                    <p id="${index}">${clue[index]} </p>
                    `;
                    break;
            }

        }

    });

    document
        .querySelector(".nav-home")
        .addEventListener("click", () => renderHomePage());
    document
        .querySelector(".nav-suspects")
        .addEventListener("click", () => RenderSuspects());
    document
        .querySelector(".nav-clues")
        .addEventListener("click", () => RenderClues());

}

