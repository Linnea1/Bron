
function RenderIntro() {

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.firstTime) {


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
    } else {
        RenderOptions()
    }
}

async function RenderOptions() {
    swapStyleSheet("css/homePage.css");

    let user = JSON.parse(localStorage.getItem("user"));

    if (user.firstTime) {

        try {
            let resourse = await fetching("api/functions.php", "PATCH", user);

            if (resourse) {
                console.log(resourse);
            }

        } catch (error) {
            popUp(error);
        }
    }


    body.style.backgroundImage = `url('Bilder/firstBackground.png')`;
    document.querySelector("main").style.backgroundImage = "";

    let options = [
        {
            title: "Nästa Steg",
            OptionPic: "Bilder/MapSlottsparken.png",
            description: "Gå till platserna markerade på kartan",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderMap
        },
        {
            title: "Misstänkta",
            OptionPic: "Bilder/suspectsBackground.png",
            description: "Dessa är de personer som är misstänkta",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderSuspects
        },
        {
            title: "Mina ledtrådar",
            OptionPic: "Bilder/cluesBackground.png",
            description: "Vem pekar ledtrådarna på?",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderClues
        }
    ];

    basicHeader();

    let main = document.querySelector("main"); // Lägg till "document." för att referera till DOM

    main.innerHTML = `
        <div class="options"></div>
    `;
    stickyNav();

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

let userCircle = null;
let map;

function RenderMap(params) {
    console.log("i renderMap");

    swapStyleSheet("css/map.css");

    body.style.backgroundImage = 'none';

    main.innerHTML = `
        <div id="map"></div>
    `;

    const x = document.querySelector("#demo");
    map = L.map('map');

    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    // Konstant för radie i meter
    const RADIUS = 40;

    function showPosition(position) {

        console.log("i showPosition");
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Om cirkeln inte redan finns, skapa den och lägg till klassen
        if (!userCircle) {
            userCircle = L.circle([latitude, longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: RADIUS / 4
            }).addTo(map);

            // Centrera kartan bara när cirkeln skapas första gången
            map.setView([latitude, longitude], 16);
        } else {
            userCircle.setLatLng([latitude, longitude]);
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Loopa igenom varje ledtråd och beräkna avståndet till användarens position
        CLUES.forEach(clue => {
            let clueLat = clue.koordinater[0];
            let clueLng = clue.koordinater[1];

            // Beräkna avståndet mellan användarens position och ledtrådens position
            let distance = calculateDistance(latitude, longitude, clueLat, clueLng);

            // Kontrollera om avståndet är inom den angivna radie
            if (distance <= RADIUS) {
                notifyAndNavigate(clue.id);
            }

            // Markera varje koordinat på kartan med en pin och visa popup vid klick
            let marker = L.marker(clue.koordinater).addTo(map);
            marker.bindPopup(`<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtråd</div>`);
        });
    }

    // Funktion för att beräkna avstånd mellan två koordinater (i meter)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
    }

    // Funktion för att konvertera grader till radianer
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

}

function notifyAndNavigate(id) {
    CluePopUp(id)
}















// function RenderIntro() {

//     let user = JSON.parse(localStorage.getItem("user"));

//     if (user.firstTime) {


//         basicHeader()
//         let main = body.querySelector("main");
//         body.style.backgroundImage = `url('Bilder/intro.png')`;
//         body.style.backgroundSize = "cover";
//         main.style.display = "flex";
//         main.style.flexDirection = "column";
//         main.style.position = "absolute"

//         document.querySelector("main").innerHTML = `
//         <div id="SagaIntro">
//             <h2> Saga: </h2>
//             <h3> Tack så mycket för att du hjälper mig med utredningen. Din information är ovärderlig för vårat arbete.

//             Så här mycket vet vi hittills: offret heter Klas och han blev mördad  sent på natten igår. Varje liten bit information kan vara den pusselbit  vi behöver för att lösa fallet. </h3>
//         </div>

//         <button id="next" onclick="RenderOptions()"> Nästa </button>
//     `;
//     } else {
//         RenderOptions()
//     }
// }

// async function RenderOptions() {
//     swapStyleSheet("css/homePage.css");

//     let user = JSON.parse(localStorage.getItem("user"));

//     if (user.firstTime) {

//         try {
//             let resourse = await fetching("api/functions.php", "PATCH", user);

//             if (resourse) {
//                 console.log(resourse);
//             }

//         } catch (error) {
//             popUp(error);
//         }
//     }


//     body.style.backgroundImage = `url('Bilder/firstBackground.png')`;
//     document.querySelector("main").style.backgroundImage = "";

//     let options = [
//         {
//             title: "Nästa Steg",
//             OptionPic: "Bilder/MapSlottsparken.png",
//             description: "Gå till platserna markerade på kartan",
//             sagaPic: "Bilder/Saga.jpg",
//             event: RenderMap
//         },
//         {
//             title: "Misstänkta",
//             OptionPic: "Bilder/suspectsBackground.png",
//             description: "Dessa är de personer som är misstänkta",
//             sagaPic: "Bilder/Saga.jpg",
//             event: RenderSuspects
//         },
//         {
//             title: "Mina ledtrådar",
//             OptionPic: "Bilder/cluesBackground.png",
//             description: "Vem pekar ledtrådarna på?",
//             sagaPic: "Bilder/Saga.jpg",
//             event: RenderClues
//         }
//     ];

//     basicHeader();

//     let main = document.querySelector("main"); // Lägg till "document." för att referera till DOM

//     main.innerHTML = `
//         <div class="options"></div>
//     `;
//     stickyNav();

//     options.forEach(option => {
//         let divDom = document.createElement("div");
//         divDom.classList.add("option");
//         document.querySelector(".options").append(divDom);

//         divDom.innerHTML = `
//             <h2 class="title">${option.title}</h2>
//             <div class="optionPic" style="background-image: url('${option.OptionPic}')"></div>
//             <div class="picSaga" style="background-image: url('${option.sagaPic}')"></div>
//             <div class="description"> 
//                 <p>${option.description}</p>
//             </div>
//         `;

//         divDom.addEventListener("click", option.event);
//     });
// }


// let map;

// function RenderMap(params) {
//     swapStyleSheet("css/map.css");

//     body.style.backgroundImage = `url('none')`;

//     main.innerHTML = `
//         <div id="map"></div>
//     `;

//     const x = document.querySelector("#demo");
//     map = L.map('map');

//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }

//     // Konstant för radie i meter
//     const RADIUS = 40;
//     let userCircle;

//     function showPosition(position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         // Skapa eller uppdatera användarens cirkel
//         if (userCircle) {
//             userCircle.setLatLng([latitude, longitude]);
//         } else {
//             userCircle = L.circle([latitude, longitude], {
//                 color: 'red',
//                 fillColor: '#f03',
//                 fillOpacity: 0.5,
//                 radius: RADIUS / 4
//             }).addTo(map);
//             // Centrera kartan bara när cirkeln skapas första gången
//             map.setView([latitude, longitude], 16);
//         }

//         // Rensa tidigare markeringar för ledtrådar
//         map.eachLayer(function (layer) {
//             if (layer instanceof L.Marker) {
//                 map.removeLayer(layer);
//             }
//         });

//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);

//         // Loopa igenom varje ledtråd och beräkna avståndet till användarens position
//         CLUES.forEach(clue => {
//             let clueLat = clue.koordinater[0];
//             let clueLng = clue.koordinater[1];

//             // Beräkna avståndet mellan användarens position och ledtrådens position
//             let distance = calculateDistance(latitude, longitude, clueLat, clueLng);

//             // Kontrollera om avståndet är inom den angivna radie
//             if (distance <= RADIUS) {
//                 notifyAndNavigate(clue.id);
//             }

//             // Markera varje koordinat på kartan med en pin och visa popup vid klick
//             let marker = L.marker(clue.koordinater).addTo(map);
//             marker.bindPopup(`<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClue(${clue.id})"> Gå till ledtråd</div>`);
//         });
//     }

//     // Funktion för att beräkna avstånd mellan två koordinater (i meter)
//     function calculateDistance(lat1, lon1, lat2, lon2) {
//         const R = 6371e3; // Earth's radius in meters
//         const φ1 = toRadians(lat1);
//         const φ2 = toRadians(lat2);
//         const Δφ = toRadians(lat2 - lat1);
//         const Δλ = toRadians(lon2 - lon1);

//         const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         const distance = R * c;
//         return distance;
//     }

//     // Funktion för att konvertera grader till radianer
//     function toRadians(degrees) {
//         return degrees * Math.PI / 180;
//     }

// }


// function notifyAndNavigate(id) {
//     CluePopUp(id)
// }

// function RenderClue(id) {
//     console.log(id);
// }


