let ifPopup = true;
let cluesUnlocked = false;

function RenderIntro() {
    let user = JSON.parse(localStorage.getItem("user"));
    document.querySelector(".wrapper").style.height = "94vh;";
    document.querySelector(".sticky-nav").style.height = "60px";

    document.querySelector(".sticky-nav").style.opacity = 0;
    document.querySelector("#notes").style.opacity = 0;

    if (user.firstTime) {

        document.querySelector(".wrapper").style.backgroundImage = "none";

        basicHeader()
        let main = body.querySelector("main");
        body.style.backgroundImage = `url('Bilder/intro.png')`;
        body.style.backgroundSize = "cover";
        main.style.display = "flex";
        main.style.flexDirection = "column";
        main.style.position = "absolute"
        document.querySelector("#profilePicture").style.backgroundImage = "";

        document.querySelector("main").innerHTML = `
            <div id="SagaIntro"></div>
            <audio id="audioPlayer" src="Bilder/audio/voiceover.mp3" style="display: none;"></audio>
        `;
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.play()

        let introText = "Saga: Tack så mycket för att du hjälper mig med utredningen. Din information är ovärderlig för vårt arbete. Så här mycket vet vi hittills: offret heter Klas Eriksson och han blev mördad igår. Varje liten bit information kan vara den pusselbit vi behöver för att lösa fallet.";
        let index = 0;

        function typeWriter() {
            if (index < introText.length) {
                document.getElementById("SagaIntro").innerHTML += introText.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            }
            else {
                document.getElementById("SagaIntro").innerHTML += "<br><button id='next' onclick='moreInfo()'> Fortsätt </button>";
            }
        }

        typeWriter();
    } else {
        RenderOptions()
    }
}

function moreInfo() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = "Bilder/audio/VoiceoverPart2.mp3";
    audioPlayer.play()
    document.querySelector("#SagaIntro").innerHTML = "";
    let introTextTwo = "Saga: Använd kartan för att hitta ledtrådarna som kommer att guida dig genom mysteriet kring Klas öde. Utforska varje plats för att avslöja bit för bit av det stora pusslet och närma dig sanningen om vem som ligger bakom Klas död. För att låsa upp dessa hemligheter måste du hitta varje plats unika kod. Börja din resa vid mordplatsen, där den första ledtråden väntar på att bli upptäckt.";
    let indexTwo = 0;

    function typeWriterTwo() {
        if (indexTwo < introTextTwo.length) {
            document.getElementById("SagaIntro").innerHTML += introTextTwo.charAt(indexTwo);
            indexTwo++;
            setTimeout(typeWriterTwo, 80);
        } else {
            document.getElementById("SagaIntro").innerHTML += "<br><button id='next' onclick='RenderOptions()'> Nästa </button>";
        }
    }
    typeWriterTwo();
}

async function RenderOptions(value) {
    document.querySelector(".sticky-nav").style.opacity = 1;
    document.querySelector("#notes").style.opacity = 1;
    document.querySelector("#loading").classList.add("hidden");
    stopExecution = true;

    map = null;
    userMarker = null;

    swapStyleSheet("css/homePage.css");
    let user = JSON.parse(localStorage.getItem("user"));

    if (user.firstTime) {

        let infoContent = [
            {
                tipsTitle: "Min karta bara laddar, varför?",
                tipsText: "Om kartan inte laddas korrekt, försök att uppdatera sidan. Detta kan åtgärda problemet och få kartan att visas som den ska. Orsaken till problemet kan variera, men en enkel omladdning av sidan bör detta åtgärdas.",
                pic: ""
            },
            {
                tipsTitle: "Min position uppdateras inte på kartan & kan därför inte låsa upp nästa ledtråd",
                tipsText: "I Slottsparken kan det finnas blindspots där din plats inte uppdateras korrekt. Men oroa dig inte! Du kan fortfarande låsa upp nästa ledtråd med koden som finns på plats. Gå till LEDTRÅDAR och tryck på låset för den önskade ledtråden.",
                pic: ""
            },
            {
                tipsTitle: "Hur ser ledtråden ut? Jag hittar inte den!",
                tipsText: "Om du inte hittar ledtrådarna så kan du skriva till någon av oss som har skapat spelet. Skaparna bakom Bron är Erica, Linnea, Julia, Virve och Melinda. Johannes har också koderna.",
                pic: "Bilder/cluesPic/ClueEx.png"
            }
        ]

        popUpInfo(infoContent)

        document.querySelector(".OK").addEventListener("click", async e => {
            try {
                let resourse = await fetching("api/functions.php", "PATCH", user);
                let data = await resourse.json();
                if (resourse) {

                    let localUser = {
                        "username": data.username,
                        "email": data.email,
                        "pfp": data.pfp,
                        "firstTime": data.firstTime,
                        "done": data.done,
                        "userId": data.userId,
                        "notes": data.notes,
                        "clues": data.clues
                    }

                    window.localStorage.setItem("user", JSON.stringify(localUser));
                }
            } catch (error) {
                popUp(error);
            }
        });
    }

    document.querySelector(".wrapper").style.backgroundImage = `url('Bilder/blueGradientBkg.avif')`;
    document.querySelector("body").style.backgroundImage = `none`;
    document.querySelector("main").style.backgroundImage = "";

    let options = [
        {
            title: "KARTA",
            OptionPic: "Bilder/MapSlottsparken.png",
            description: '"Gå till platserna markerade på kartan"',
            sagaPic: "Bilder/Saga.jpg",
            event: renderCurrentLocationView
        },
        {
            title: "MISSTÄNKTA",
            OptionPic: "Bilder/suspectsBkg.jpg",
            description: '"Dessa är de personer som är misstänkta"',
            sagaPic: "Bilder/Saga.jpg",
            event: RenderSuspects
        },
        {
            title: "LEDTRÅDAR",
            OptionPic: "Bilder/cluesBackground.png",
            description: '"Vem pekar ledtrådarna på?"',
            sagaPic: "Bilder/Saga.jpg",
            event: RenderClues
        }
    ];

    basicHeader();

    let main = document.querySelector("main");

    main.innerHTML = `<div class="container"></div>`;

    options.forEach(option => {

        let divDom = document.createElement("div");
        divDom.classList.add("option");
        document.querySelector(".container").append(divDom);

        divDom.innerHTML = `
                <h2 class="title">${option.title}</h2>
                <div class="optionPic" style="background-image: url('${option.OptionPic}')"></div>
                <div class="picSaga" style="background-image: url('${option.sagaPic}')"></div>
                <div class="description"> 
                    <p>${option.description}</p>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            `;


        divDom.addEventListener("click", function () {

            main.classList.add("swiped");


            setTimeout(() => {
                main.classList.remove("swiped");
                option.event(true);
            }, 300);
        });

    });
    stickyNav();
    resetButtons()
    document.querySelector(".fa-house").classList.add("current-page");
}


let userMarker;
let map;


async function renderCurrentLocationView(value) {

    if (value) {

        main.classList.add("slide-left");

        setTimeout(() => {

            stopExecution = false;
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

            main.classList.remove("slide-left");

        }, 300);


    } else {
        stopExecution = false;
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

}


async function showPosition(position) {
    if (stopExecution) {
        return;
    }
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

        userMarker.setPosition({ lat: latitude, lng: longitude });
    }


    const RADIUS = 30;
    let user = JSON.parse(localStorage.getItem("user"));

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
                if (user.clues.includes(clue.id)) {
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
        })(clue);

        let distance = calculateDistance(latitude, longitude, clueLat, clueLng);
        const audio = new Audio('Bilder/audio/police_tone.mp3');

        if (distance <= RADIUS && ifPopup) {
            let previousClue = clue.id - 1;
            if (previousClue === 0) {
                if (user.clues.length === 0) {
                    notifyAndNavigate(clue);
                    audio.play();
                } else {
                    console.log("Kan inte låsa upp den här ledtråden ännu.");
                }
            } else {
                if (user.clues.includes(previousClue)) {
                    notifyAndNavigate(clue);
                } else {
                    console.log("Kan inte låsa upp den här ledtråden ännu.");
                }
            }
        }

    }

    animateMarkerPosition(userMarker, { lat: latitude, lng: longitude }, 2000);

}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
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
    const audio = new Audio('Bilder/audio/police_tone.mp3');
    if (!user.clues.includes(clue.id)) {
        audio.play();
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
