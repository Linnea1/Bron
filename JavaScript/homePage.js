

// async function renderHomePage() {
//     let user = JSON.parse(localStorage.getItem("user"));
//     let username = user.username

//     RenderIntro()

//     // RenderSuspects()

// }

function RenderIntro() {
    basicHeader()
    let main = body.querySelector("main");
    body.style.backgroundImage = `url('Bilder/intro.png')`;
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

        <button id="next" onclick="RenderOptions()"> Nästa </button>
    `;
}

function RenderOptions() {
    swapStyleSheet("homePage.css");

    body.style.backgroundImage = `url('Bilder/police-cars-with-emergency-lights-on-at-night-hero-m.jpg')`;

    let options = [
        {
            title: "Nästa Steg",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.46.15.png",
            description: "Gå till platserna markerade på kartan",
            sagaPic: "Bilder/Saga.jpg",
            event: "RenderMap()"
        },
        {
            title: "Misstänkta",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.47.20.png",
            description: "Dessa är de personer som är misstänkta",
            sagaPic: "Bilder/Saga.jpg",
            event: "RenderSuspects()"
        },
        {
            title: "Mina ledtrådar",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.48.17.png",
            description: "Vem pekar ledtrådarna på?",
            sagaPic: "Bilder/Saga.jpg",
            event: "RenderClues()"
        }
    ]
    console.log("hej");
    basicHeader()

    let main = body.querySelector("main");

    main.innerHTML = `
        <div class="options"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    options.forEach(option => {
        let divDom = document.createElement("div");
        divDom.classList.add("option")
        document.querySelector(".options").append(divDom);
        // divDom.style.backgroundImage = `url('${option.OptionPic}')`

        let eventFunciton = option.event;

        divDom.innerHTML = `
            <h2 class="title"> ${option.title}</h2>
            <div class="optionPic" style="background-image: url('${option.OptionPic}')"></div>
            <div class="picSaga" style="background-image: url('${option.sagaPic}')"></div>
            <div class="description" onclick="${eventFunciton}()"> 
                <p>${option.description}</p>
            </div>
        `;

        // divDom.addEventListener("click", option.event)
    })

}

