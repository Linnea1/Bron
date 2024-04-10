const CLUES = [
    {
        id: 1,
        code: 6435,
        title: "Kniven",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Mordvapnet har hittats",
        text:""

    },
    {
        id: 2,
        code: 2201,
        title: "Platsen för brottet",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Blod och skoavtryck finns på brottsplatsen",
        text:""

    },
    {
        id: 3,
        code: 9782,
        title: "Ögonvittnen",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Det finns folk som såg Klas innan han dog",
        text:""

    },
    {
        id: 4,
        code: 8414,
        title: "Övervakningskameror",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Det finns video på Klas innan han dog",
        text:""

    },
    {
        id: 5,
        code: 2009,
        title: "Klas rörelsemönster",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Klas spenderade kvällen på casinot och var aktiv vid olika spelbord",
        text:""

    }
];

const SUSPECTS = [
    {
        suspectId: 1,
        name: "Kristoffer",
        age: "50",
        image: "Bilder/misstänkta/kristoffer.jpg",
        text: "Klas har lånat pengar från Kristoffer och hans ex fru Emma. Kristoffer har bett Klas betala tillbaka summan pengar men han har inte haft råd. Klas och Kristoffer bråkade kvällen innan mordet. Han var hemma med barnen medan frun var borta.",
        guilty: false

    },
    {
        suspectId: 2,
        name: "Göran",
        age: "57",
        image: "Bilder/misstänkta/Göran.png",
        text: "Klas smsar Göran efter sin stora vinst på casinot. Jobbade för Uber den kvällen, han hade inte mycket körningar den kvällen och sade att han ofta stod parkerad.",
        guilty: true

    },
    {
        suspectId: 3,
        name: "Erik",
        age: "34",
        image: "Bilder/misstänkta/Erik.png",
        text: "Erik ser Klas vinna den stora mängden pengar. Erik stämplar ut samtidigt som Klas och stämplar in en timme senare.",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Robin",
        age: "30",
        image: "Bilder/misstänkta/Robin.jpg",
        text: "Precis kommit ut från fängelset för ett liknande mordförsök, han är också dömd för rånförsök och även andra mindre brott. På gatorna är han en känd knarklangare. Robin säger att han var på en fest i centrala Malmö, däremot kan ingen bekräfta att han var på denna fest.",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Anna",
        age: "48",
        image: "Bilder/misstänkta/Anna.png",
        text: "Gick hem från en AW och såg Klas räkna massor av kontanter bakom ett träd.",
        guilty: false

    }
];