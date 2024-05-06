let ifPopup = true;

function RenderIntro() {
    toggleFullscreen()
    let user = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".wrapper").style.height = "100%";
    document.querySelector(".wrapper").style.paddingBottom = "75px";
    document.querySelector(".sticky-nav").style.height = "60px";

    if (user.firstTime) {

        document.querySelector(".wrapper").style.backgroundImage = "none";

        basicHeader()
        let main = body.querySelector("main");
        body.style.backgroundImage = `url('Bilder/intro.png')`;
        body.style.backgroundSize = "cover";
        main.style.display = "flex";
        main.style.flexDirection = "column";
        main.style.position = "absolute"

        document.querySelector("main").innerHTML = `
            <div id="SagaIntro"></div>
        `;

        let introText = "Saga: Tack så mycket för att du hjälper mig med utredningen. Din information är ovärderlig för vårt arbete. Så här mycket vet vi hittills: offret heter Klas och han blev mördad sent på natten igår. Varje liten bit information kan vara den pusselbit vi behöver för att lösa fallet.";
        let index = 0;

        function typeWriter() {
            if (index < introText.length) {
                document.getElementById("SagaIntro").innerHTML += introText.charAt(index);
                index++;
                setTimeout(typeWriter, 10); // Justera fördröjningen här (50 ms för varje bokstav)
            } else {
                // När all text är skriven ut, lägg till knappen "Nästa"
                document.getElementById("SagaIntro").innerHTML += "<br><button id='next' onclick='RenderOptions()'> Nästa </button>";
            }
        }

        // Starta skrivaren
        typeWriter();
    } else {
        RenderOptions()
    }
}


async function RenderOptions() {
    document.querySelector(".sticky-nav").style.opacity = 1;
    document.querySelector("#notes").style.opacity = 1;
    document.querySelector("main").style.height = "84vh";

    map = null;
    userMarker = null;

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

    // document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/bluredBackground.png')`;
    document.querySelector(".wrapper").style.backgroundImage = `none`;
    document.querySelector(".wrapper").style.backgroundColor = "#3e4c4f";
    document.querySelector("main").style.backgroundImage = "";

    let options = [
        {
            title: "KARTA",
            OptionPic: "Bilder/MapSlottsparken.png",
            description: "Gå till platserna markerade på kartan",
            sagaPic: "Bilder/Saga.jpg",
            event: renderCurrentLocationView
        },
        {
            title: "MISSTÄNKTA",
            OptionPic: "Bilder/suspectsBkg.jpg",
            description: "Dessa är de personer som är misstänkta",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderSuspects
        },
        {
            title: "LEDTRÅDAR",
            OptionPic: "Bilder/cluesBackground.png",
            description: "Vem pekar ledtrådarna på?",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderClues
        }
    ];

    basicHeader();

    let main = document.querySelector("main");

    main.innerHTML = `

    `;


    /*
    
        {
            title: "ANTECKNINGAR",
            OptionPic: "Bilder/notesBackground.jpg",
            description: "Samla dina anteckningar här",
            sagaPic: "Bilder/Saga.jpg",
            event: RenderNotes
        }
    */



    options.forEach(option => {

        let divDom = document.createElement("div");
        divDom.classList.add("option");
        main.append(divDom);

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
    stickyNav();
    resetButtons()
    document.querySelector(".fa-house").classList.add("current-page");
}


let userMarker;
let map;

async function renderCurrentLocationView() {
    if (map) {
        map = null;
    }
    if (userMarker) {
        userMarker = null;
    }

    swapStyleSheet("css/map.css");
    document.querySelector("#notes").style.opacity = 0;
    document.querySelector("main").style.height = "100%";
    resetButtons()
    document.querySelector(".fa-map").classList.add("current-page");
    body.style.backgroundImage = 'none';
    main.innerHTML = `<div id="map"></div>`;

    document.querySelector("#loading").classList.remove("hidden");
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}


async function showPosition(position) {
    document.querySelector(".wrapper").style.backgroundImage = "none";

    document.querySelector("#loading").classList.add("hidden");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapOptions = {
        zoom: 19,
        center: { lat: latitude, lng: longitude },
        gestureHandling: 'greedy'
    };

    const mapElement = document.querySelector("#map");

    // Skapa kartan om den inte redan finns
    if (!map) {
        map = new google.maps.Map(mapElement, mapOptions);
    }

    if (!userMarker) {

        userMarker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'blue',
                fillOpacity: 1,
                scale: 10,
                strokeColor: 'white',
                strokeWeight: 2
            },
            animation: google.maps.Animation.DROP
        });

    } else {
        // Uppdatera bara markörens position
        userMarker.setPosition({ lat: latitude, lng: longitude });
    }


    const RADIUS = 30;
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.clues.length);

    let resourse = await fetching(`api/functions.php?user=${user.username}`);
    let openInfoWindows = [];



    for (let i = 0; i < CLUES.length; i++) {
        const clue = CLUES[i];

        let clueLat = clue.koordinater[0];
        let clueLng = clue.koordinater[1];

        if (user.clues.includes(clue.id)) {
            var iconUrl = 'Bilder/Test.png';
        } else {
            var iconUrl = 'Bilder/TestTwo.png';
        }

        let marker = new google.maps.Marker({
            position: { lat: clueLat, lng: clueLng },
            map: map,
            icon: {
                url: iconUrl,
                scaledSize: new google.maps.Size(40, 50),
            }
        });

        (function (clue) {
            marker.addListener('click', () => {
                openInfoWindows.forEach(infoWindow => {
                    infoWindow.close();
                });
                openInfoWindows = [];

                let updatedContent;
                let infoWindowStyle = '';
                if (user.clues.includes(clue.id) || user.clues.length === 0) {
                    updatedContent = `  <div class="DescPic" style="background-image: url('${clue.Locationimage}')"></div> <div class="textdiv"> <b>${clue.id}. ${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtrådar</div></div> <br>`;
                    infoWindowStyle = 'margin: 3vw;';
                } else {
                    updatedContent = ` <div class="DescPic" style="background-image: url('${clue.Locationimage}')"></div> <div class="textdiv"> <b>${clue.id}. Låst</b> <br><div> ${clue.text}</div> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtrådar</div> </div>  <br>`;
                    infoWindowStyle = 'margin: 3vw;';
                }

                let updatedInfoWindow = new google.maps.InfoWindow({
                    content: updatedContent,
                    style: infoWindowStyle
                });
                updatedInfoWindow.open(map, marker);
                openInfoWindows.push(updatedInfoWindow);
            });
        })(clue); // Anropa funktionen omedelbart med aktuell ledtråd

        let distance = calculateDistance(latitude, longitude, clueLat, clueLng);
        const audio = new Audio('Bilder/audio/police_tone.mp3');

        if (distance <= RADIUS && ifPopup) {
            let lastClue = clue.id - 1;
            if (user.clues.includes(lastClue) || user.clues.length === 0) {
                notifyAndNavigate(clue);
                audio.play();
                if ("vibrate" in navigator) {
                    navigator.vibrate([200, 100, 200]); // Anpassa vibrationens mönster efter behov
                }
            } else {
                console.log("Finns inte");
            }
        }

    }

    animateMarkerPosition(userMarker, { lat: latitude, lng: longitude }, 2000);

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

function animateMarkerPosition(marker, newPosition, duration) {
    let start = performance.now();
    let initialPosition = marker.getPosition();
    let deltaLat = (newPosition.lat - initialPosition.lat()) / duration;
    let deltaLng = (newPosition.lng - initialPosition.lng()) / duration;

    function animate() {
        let elapsed = performance.now() - start;
        let progress = Math.min(elapsed / duration, 1);
        let lat = initialPosition.lat() + deltaLat * elapsed;
        let lng = initialPosition.lng() + deltaLng * elapsed;
        marker.setPosition({ lat: lat, lng: lng });
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
