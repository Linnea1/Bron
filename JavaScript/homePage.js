
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
    swapStyleSheet("css/homePage.css");

    body.style.backgroundImage = `url('Bilder/firstBackground.png')`;

    let options = [
        {
            title: "Nästa Steg",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.46.15.png",
            description: "Gå till platserna markerade på kartan",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderMap
        },
        {
            title: "Misstänkta",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.47.20.png",
            description: "Dessa är de personer som är misstänkta",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderSuspects
        },
        {
            title: "Mina ledtrådar",
            OptionPic: "Bilder/Skärmavbild 2024-04-08 kl. 10.48.17.png",
            description: "Vem pekar ledtrådarna på?",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderClues
        }
    ];

    basicHeader();

    let main = document.querySelector("main"); // Lägg till "document." för att referera till DOM

    main.innerHTML = `
        <div class="options"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    options.forEach(option => {
        let divDom = document.createElement("div");
        divDom.classList.add("option");
        document.querySelector(".options").append(divDom);

        divDom.innerHTML = `
            <h2 class="title">${option.title}</h2>
            <div class="optionPic" style="background-image: url('${option.OptionPic}')"></div>
            <div class="picSaga" style="background-image: url('${option.sagaPic}')"></div>
            <div class="description"> 
                <p>${option.description}</p>
            </div>
        `;

        divDom.addEventListener("click", option.event);
    });
}


function RenderMap(params) {

    swapStyleSheet("css/map.css");

    body.style.backgroundImage = `url('none')`;

    main.innerHTML = `
        <div id="map"></div>
        <nav class="sticky-nav">${stickyNav()}</nav>
    `;

    const x = document.querySelector("#demo");
    const map = L.map('map');

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    // Konstant för radie i meter
    const RADIUS = 20;

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        map.setView([55.6018888889, 12.9905555556], 16); // Centrera kartan på användarens position

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Markera användarens position på kartan med en cirkel
        let userCircle = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: RADIUS
        }).addTo(map);

        // Rita polygon för området
        const areaPolygon = L.polygon(CLUES.map(clue => clue.koordinater), { color: 'orange' }).addTo(map);

        // Markera varje koordinat på kartan med en pin och visa popup vid klick
        CLUES.forEach(clue => {
            let marker = L.marker(clue.koordinater).addTo(map);
            marker.bindPopup("<b>" + clue.title + "</b><br>" + clue.shortText);
        });

        // Kontrollera om användaren är inom radie från de utsatta koordinaterna
        if (checkInsideRegion([latitude, longitude], CLUES.map(clue => clue.koordinater))) {
            notifyAndNavigate();
        }

    }

    function notifyAndNavigate() {
        // Gå vidare till en annan funktion här
    }

    // Function to check if a point is inside a polygon
    function checkInsideRegion(point, polygon) {
        let x = point[0];
        let y = point[1];
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi = polygon[i][0], yi = polygon[i][1];
            let xj = polygon[j][0], yj = polygon[j][1];

            let intersect = ((yi > y) != (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
}
