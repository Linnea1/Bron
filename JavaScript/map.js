// function RenderMap(params) {

//     swapStyleSheet("css/map.css");

//     body.style.backgroundImage = `url('none')`;

//     main.innerHTML = `
//         <nav class="sticky-nav">${stickyNav()}</nav>
//     `;

//     const CLUES = [
//         {
//             id: 1,
//             code: 6435,
//             title: "Kniven",
//             image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
//             shortText: "Mordvapnet har hittats",
//             text: "",
//             koordinater: [55.6024166667, 12.9946388889]

//         },
//         {
//             id: 2,
//             code: 2201,
//             title: "Platsen för brottet",
//             image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
//             shortText: "Blod och skoavtryck finns på brottsplatsen",
//             text: "",
//             koordinater: [55.6018888889, 12.9905555556]

//         },
//         {
//             id: 3,
//             code: 9782,
//             title: "Ögonvittnen",
//             image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
//             shortText: "Det finns folk som såg Klas innan han dog",
//             text: "",
//             koordinater: [55.6026944444, 12.9892222222]

//         },
//         {
//             id: 4,
//             code: 8414,
//             title: "Övervakningskameror",
//             image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
//             shortText: "Det finns video på Klas innan han dog",
//             text: "",
//             koordinater: [55.6021944444, 12.9913611111]

//         },
//         {
//             id: 5,
//             code: 2009,
//             title: "Klas rörelsemönster",
//             image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
//             shortText: "Klas spenderade kvällen på casinot och var aktiv vid olika spelbord",
//             text: "",
//             koordinater: [55.6014166667, 12.9913055556]

//         }
//     ];

//     const x = document.querySelector("#demo");
//     const map = L.map('map');

//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }

//     // Konstant för radie i meter
//     const RADIUS = 10;

//     function showPosition(position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         // x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

//         map.setView([latitude, longitude], 13);
//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '© OpenStreetMap'
//         }).addTo(map);

//         // Markera användarens position på kartan med en cirkel
//         let userCircle = L.circle([latitude, longitude], {
//             color: 'red',
//             fillColor: '#3388ff',
//             fillOpacity: 0.5,
//             radius: RADIUS
//         }).addTo(map);

//         // Rita polygon för området
//         const areaPolygon = L.polygon(CLUES.map(clue => clue.koordinater), { color: 'orange' }).addTo(map);

//         // Markera varje koordinat på kartan med en pin och visa popup vid klick
//         CLUES.forEach(clue => {
//             let marker = L.marker(clue.koordinater).addTo(map);
//             marker.bindPopup("<b>" + clue.title + "</b><br>" + clue.koordinater[0] + ", " + clue.koordinater[1]);
//         });

//         // Kontrollera om användaren är inom radie från de utsatta koordinaterna
//         if (checkInsideRegion([latitude, longitude], CLUES.map(clue => clue.koordinater))) {
//             notifyAndNavigate();
//         }
//     }

//     function notifyAndNavigate() {
//         // Gå vidare till en annan funktion här
//     }

//     // Function to check if a point is inside a polygon
//     function checkInsideRegion(point, polygon) {
//         let x = point[0];
//         let y = point[1];
//         let inside = false;
//         for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//             let xi = polygon[i][0], yi = polygon[i][1];
//             let xj = polygon[j][0], yj = polygon[j][1];

//             let intersect = ((yi > y) != (yj > y)) &&
//                 (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//             if (intersect) inside = !inside;
//         }
//         return inside;
//     }
// }
