let ifPopup = true;

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
    // Återställ kartan och användarens position
    map = null;
    userMarker = null;

    // Ditt befintliga kodblock fortsätter här
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

    let main = document.querySelector("main");

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
// let outerCircle;
let radius = 5; // Initialt värde på radien för den yttersta cirkeln
// const scale = 10;


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
                scale: 10, // Justera storleken efter behov
                strokeColor: 'white',
                strokeWeight: 2
            }
        });

    } else {
        // Uppdatera bara markörens position
        userMarker.setPosition({ lat: latitude, lng: longitude });
    }

    const RADIUS = 20;

    // Loopa igenom ledtrådarna och skapa markörer för varje ledtråd
    CLUES.forEach(clue => {
        let clueLat = clue.koordinater[0];
        let clueLng = clue.koordinater[1];

        // Skapa ett nytt markörobjekt med anpassad ikon
        let marker = new google.maps.Marker({
            position: { lat: clueLat, lng: clueLng },
            map: map,
            icon: {
                url: 'Bilder/customPin.png', // Ange sökvägen till din anpassade bakgrundsbild
                scaledSize: new google.maps.Size(40, 40), // Ställ in storleken på din ikon
            }
        });

        // Skapa en informationsruta för varje markör
        let infoWindow = new google.maps.InfoWindow({
            content: `<b>${clue.title}</b><br>${clue.shortText}</b><br> <div id="GoTo" onclick="RenderClues(${clue.id})"> Gå till ledtrådar</div>`
        });

        // Lägg till en händelselyssnare för att öppna informationsrutan när markören klickas på
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        // Beräkna avståndet mellan användarens position och ledtrådens position
        let distance = calculateDistance(latitude, longitude, clueLat, clueLng);

        // Om ledtråden är inom det specificerade radien och popup-meddelanden är aktiverade
        if (distance <= RADIUS && ifPopup) {
            notifyAndNavigate(clue);
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
