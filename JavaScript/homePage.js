let ifPopup=true;

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
            event: renderCurrentLocationView
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


let userMarker;
let map;
// Flagga för att kontrollera om användarens plats redan har hämtats

async function renderCurrentLocationView() {
    swapStyleSheet("css/map.css");
    body.style.backgroundImage = 'none';
    main.innerHTML = `<div id="map"></div>`;

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }


}


async function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapOptions = {
        zoom: 19,
        center: { lat: latitude, lng: longitude },
    };

    const mapElement = document.querySelector("#map");

    // Skapa kartan om den inte redan finns
    if (!map) {
        map = new google.maps.Map(mapElement, mapOptions);
        // addYourLocationButton(map, userMarker);
    }

    // Skapa den nya markören för användarens plats
    if (!userMarker) {
        userMarker = new google.maps.Marker({ position: { lat: latitude, lng: longitude }, map: map });
    } else {
        // Uppdatera bara markörens position
        userMarker.setPosition({ lat: latitude, lng: longitude });
    }

    const RADIUS = 20;
    // Add popup info window for each clue marker
    CLUES.forEach(clue => {
        let clueLat = clue.koordinater[0];
        let clueLng = clue.koordinater[1];

        let marker = new google.maps.Marker({ position: { lat: clue.koordinater[0], lng: clue.koordinater[1] }, map: map });
        let infoWindow = new google.maps.InfoWindow({ content: `<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtrådar</div>` });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        let distance = calculateDistance(latitude, longitude, clueLat, clueLng);

        if (distance <= RADIUS) {
            if (ifPopup) {
                notifyAndNavigate(clue);
            }
        }
    });
}

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
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}



function showError(error) {
    console.error("Error getting location:", error.message);
}

function notifyAndNavigate(clue) {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.clues)
    if (!user.clues.includes(clue.id)) {
        CluePopUp(clue.id)
    }

}

function addYourLocationButton(map, marker) {
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    firstChild.addEventListener('click', function () {
        var imgX = '0';
        var animationInterval = setInterval(function () {
            if (imgX == '-18') imgX = '0';
            else imgX = '-18';
        }, 500);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                marker.setPosition(latlng);
                map.setCenter(latlng);
                clearInterval(animationInterval);
            });
        }
        else {
            clearInterval(animationInterval);
        }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

// let ifPopup=true;

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
//     resetButtons()
//     document.querySelector(".fa-house").classList.add("current-page");
//     document.querySelector(".text-home").classList.add("current-page");
// }

// let userCircle = null;
// let map = null;

// function RenderMap(params) {

//     swapStyleSheet("css/map.css");

//     if (map !== null) {
//         map.off();
//         map.remove();
//         map = null;
//         userCircle = null;
//     }

//     body.style.backgroundImage = 'none';

//     main.innerHTML = `
//         <div id="map"></div>
//     `;

//     const x = document.querySelector("#demo");
//     map = L.map('map');

//     map.eachLayer(function (layer) {
//         map.removeLayer(layer);
//     });

//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }

//     // Konstant för radie i meter
//     const RADIUS = 40;

//     function showPosition(position) {

//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         // Om cirkeln inte redan finns, skapa den och lägg till klassen
//         if (!userCircle) {
//             userCircle = L.circle([latitude, longitude], {
//                 color: 'red',
//                 fillColor: '#f03',
//                 fillOpacity: 0.5,
//                 radius: RADIUS / 4
//             }).addTo(map);

//             // userCircle2 = L.circle([latitude, longitude], {
//             //     color: 'blue',
//             //     fillColor: '#00f',
//             //     fillOpacity: 0.5,
//             //     radius: RADIUS / 2
//             // }).addTo(map);

//             // Centrera kartan bara när cirkeln skapas första gången
//             map.setView([latitude, longitude], 16);
//         } else {
//             // map.flyTo([latitude, longitude], 16);
//             // userCircle.setLatLng([latitude, longitude]).fire('move');
//             userCircle.setLatLng([latitude, longitude]);
//         }

//         // userCircle2.getElement().style.transition = 'all 0.3s';
//         // userCircle2.getElement().style.animation = 'pulse 1.5s infinite';

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
//                 if(ifPopup){
//                     notifyAndNavigate(clue);
//                 }
//             }

//             // Markera varje koordinat på kartan med en pin och visa popup vid klick
//             let marker = L.marker(clue.koordinater).addTo(map);
//             marker.bindPopup(`<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtrådar</div>`);
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

// function notifyAndNavigate(clue) {
//     let user = JSON.parse(localStorage.getItem("user"));
//     console.log(user.clues)
//     if (!user.clues.includes(clue.id)) {
//         CluePopUp(clue.id)
//     }
    
// }















// // function RenderIntro() {

// //     let user = JSON.parse(localStorage.getItem("user"));

// //     if (user.firstTime) {


// //         basicHeader()
// //         let main = body.querySelector("main");
// //         body.style.backgroundImage = `url('Bilder/intro.png')`;
// //         body.style.backgroundSize = "cover";
// //         main.style.display = "flex";
// //         main.style.flexDirection = "column";
// //         main.style.position = "absolute"

// //         document.querySelector("main").innerHTML = `
// //         <div id="SagaIntro">
// //             <h2> Saga: </h2>
// //             <h3> Tack så mycket för att du hjälper mig med utredningen. Din information är ovärderlig för vårat arbete.

// //             Så här mycket vet vi hittills: offret heter Klas och han blev mördad  sent på natten igår. Varje liten bit information kan vara den pusselbit  vi behöver för att lösa fallet. </h3>
// //         </div>

// //         <button id="next" onclick="RenderOptions()"> Nästa </button>
// //     `;
// //     } else {
// //         RenderOptions()
// //     }
// // }

// // async function RenderOptions() {
// //     swapStyleSheet("css/homePage.css");

// //     let user = JSON.parse(localStorage.getItem("user"));

// //     if (user.firstTime) {

// //         try {
// //             let resourse = await fetching("api/functions.php", "PATCH", user);

// //             if (resourse) {
// //                 console.log(resourse);
// //             }

// //         } catch (error) {
// //             popUp(error);
// //         }
// //     }


// //     body.style.backgroundImage = `url('Bilder/firstBackground.png')`;
// //     document.querySelector("main").style.backgroundImage = "";

// //     let options = [
// //         {
// //             title: "Nästa Steg",
// //             OptionPic: "Bilder/MapSlottsparken.png",
// //             description: "Gå till platserna markerade på kartan",
// //             sagaPic: "Bilder/Saga.jpg",
// //             event: RenderMap
// //         },
// //         {
// //             title: "Misstänkta",
// //             OptionPic: "Bilder/suspectsBackground.png",
// //             description: "Dessa är de personer som är misstänkta",
// //             sagaPic: "Bilder/Saga.jpg",
// //             event: RenderSuspects
// //         },
// //         {
// //             title: "Mina ledtrådar",
// //             OptionPic: "Bilder/cluesBackground.png",
// //             description: "Vem pekar ledtrådarna på?",
// //             sagaPic: "Bilder/Saga.jpg",
// //             event: RenderClues
// //         }
// //     ];

// //     basicHeader();

// //     let main = document.querySelector("main"); // Lägg till "document." för att referera till DOM

// //     main.innerHTML = `
// //         <div class="options"></div>
// //     `;
// //     stickyNav();

// //     options.forEach(option => {
// //         let divDom = document.createElement("div");
// //         divDom.classList.add("option");
// //         document.querySelector(".options").append(divDom);

// //         divDom.innerHTML = `
// //             <h2 class="title">${option.title}</h2>
// //             <div class="optionPic" style="background-image: url('${option.OptionPic}')"></div>
// //             <div class="picSaga" style="background-image: url('${option.sagaPic}')"></div>
// //             <div class="description"> 
// //                 <p>${option.description}</p>
// //             </div>
// //         `;

// //         divDom.addEventListener("click", option.event);
// //     });
// // }


// // let map;

// // function RenderMap(params) {
// //     swapStyleSheet("css/map.css");

// //     body.style.backgroundImage = `url('none')`;

// //     main.innerHTML = `
// //         <div id="map"></div>
// //     `;

// //     const x = document.querySelector("#demo");
// //     map = L.map('map');

// //     if (navigator.geolocation) {
// //         navigator.geolocation.watchPosition(showPosition);
// //     } else {
// //         x.innerHTML = "Geolocation is not supported by this browser.";
// //     }

// //     // Konstant för radie i meter
// //     const RADIUS = 40;
// //     let userCircle;

// //     function showPosition(position) {
// //         const latitude = position.coords.latitude;
// //         const longitude = position.coords.longitude;

// //         // Skapa eller uppdatera användarens cirkel
// //         if (userCircle) {
// //             userCircle.setLatLng([latitude, longitude]);
// //         } else {
// //             userCircle = L.circle([latitude, longitude], {
// //                 color: 'red',
// //                 fillColor: '#f03',
// //                 fillOpacity: 0.5,
// //                 radius: RADIUS / 4
// //             }).addTo(map);
// //             // Centrera kartan bara när cirkeln skapas första gången
// //             map.setView([latitude, longitude], 16);
// //         }

// //         // Rensa tidigare markeringar för ledtrådar
// //         map.eachLayer(function (layer) {
// //             if (layer instanceof L.Marker) {
// //                 map.removeLayer(layer);
// //             }
// //         });

// //         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //             maxZoom: 19,
// //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //         }).addTo(map);

// //         // Loopa igenom varje ledtråd och beräkna avståndet till användarens position
// //         CLUES.forEach(clue => {
// //             let clueLat = clue.koordinater[0];
// //             let clueLng = clue.koordinater[1];

// //             // Beräkna avståndet mellan användarens position och ledtrådens position
// //             let distance = calculateDistance(latitude, longitude, clueLat, clueLng);

// //             // Kontrollera om avståndet är inom den angivna radie
// //             if (distance <= RADIUS) {
// //                 notifyAndNavigate(clue.id);
// //             }

// //             // Markera varje koordinat på kartan med en pin och visa popup vid klick
// //             let marker = L.marker(clue.koordinater).addTo(map);
// //             marker.bindPopup(`<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClue(${clue.id})"> Gå till ledtråd</div>`);
// //         });
// //     }

// //     // Funktion för att beräkna avstånd mellan två koordinater (i meter)
// //     function calculateDistance(lat1, lon1, lat2, lon2) {
// //         const R = 6371e3; // Earth's radius in meters
// //         const φ1 = toRadians(lat1);
// //         const φ2 = toRadians(lat2);
// //         const Δφ = toRadians(lat2 - lat1);
// //         const Δλ = toRadians(lon2 - lon1);

// //         const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
// //             Math.cos(φ1) * Math.cos(φ2) *
// //             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
// //         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// //         const distance = R * c;
// //         return distance;
// //     }

// //     // Funktion för att konvertera grader till radianer
// //     function toRadians(degrees) {
// //         return degrees * Math.PI / 180;
// //     }

// // }


// // function notifyAndNavigate(id) {
// //     CluePopUp(id)
// // }

// // function RenderClue(id) {
// //     console.log(id);
// // }


