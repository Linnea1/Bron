const CLUES = [
    {
        id: 1,
        code: 6435,
        title: "Kniven",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Mordvapnet har hittats",
        text: "",
        koordinater: [55.60273330679147, 12.989689799850712]

    },
    {
        id: 2,
        code: 2201,
        title: "Platsen för brottet",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Blod och skoavtryck finns på brottsplatsen",
        text: "",
        koordinater: [55.6018888889, 12.9905555556]

    },
    {
        id: 3,
        code: 9782,
        title: "Bråk mellan Kristoffer och Klas",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Exfruns vittnesmål om bråket mellan Kristoffer och Klas.",
        text: "",
        koordinater: [55.60147185428268, 12.99121296649658]

    },
    {
        id: 4,
        code: 8414,
        title: "Övervakningskameror",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Det finns video på Klas innan han dog",
        text: "",
        koordinater: [55.60074586831715, 12.993409032961107]

    },
    {
        id: 5,
        code: 2009,
        title: "Eriks stämpelkort",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Eriks stämpelkort",
        text: "",
        koordinater: [55.6026051896978, 12.99257303071663]

    },
    {
        id: 6,
        code: 3286,
        title: "Här hittades Klas kropp & obduktionsrapport",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Ett par var ute på promenad när de hittade Klas kropp i vattenbrynet. Här får du även obduktionsrapporten",
        text: "",
        koordinater: [55.60277273529414, 12.988879344848087]

    },
    {
        id: 7,
        code: 2753,
        title: "Görans rörelsemönster",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Här är Görans rörelsemönster under kvällen",
        text: "",
        koordinater: [55.60307051733962, 12.994193590927555]

    }
    ,
    {
        id: 8,
        code: 9063,
        title: "Annas POV",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Anna ser hur Göran räknar sina pengar",
        text: "",
        koordinater: [55.603214837494534, 12.991839320922354]

    },
    {
        id: 9,
        code: 2840,
        title: "Samtalshistorik ",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Visar sig att Klas har Robin som kontakt under namnet Robban, haft kontakt under kvällen.",
        text: "",
        koordinater: [55.60249199340967, 12.993933693685316]

    },
    {
        id: 10,
        code: 2840,
        title: "Klas sms till Göran ",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Klas sms till Göran",
        text: "",
        koordinater: [55.60286369491501, 12.99134720613196]

    },
    {
        id: 11,
        code: 5040,
        title: "Test",
        image: "Bilder/footprint-in-the-mud-grass-and-mud-texture-photo.jpg",
        shortText: "Här är Görans rörelsemönster under kvällen",
        text: "",
        koordinater: [55.61069463650604, 12.995365697320894]
    },
];

const SUSPECTS = [
    {
        suspectId: 1,
        name: "Kristoffer",
        age: "50",
        image: "Bilder/suspects/kristoffer.jpg",
        text: "Klas har lånat pengar från Kristoffer och hans ex fru Emma. Kristoffer har bett Klas betala tillbaka summan pengar men han har inte haft råd. Klas och Kristoffer bråkade kvällen innan mordet. Han var hemma med barnen medan frun var borta.",
        guilty: false

    },
    {
        suspectId: 2,
        name: "Göran",
        age: "57",
        image: "Bilder/suspects/Goran.png",
        text: "Klas smsar Göran efter sin stora vinst på casinot. Jobbade för Uber den kvällen, han hade inte mycket körningar den kvällen och sade att han ofta stod parkerad.",
        guilty: true

    },
    {
        suspectId: 3,
        name: "Erik",
        age: "34",
        image: "Bilder/suspects/Erik.png",
        text: "Erik ser Klas vinna den stora mängden pengar. Erik stämplar ut samtidigt som Klas och stämplar in en timme senare.",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Robin",
        age: "30",
        image: "Bilder/suspects/Robin.jpg",
        text: "Precis kommit ut från fängelset för ett liknande mordförsök, han är också dömd för rånförsök och även andra mindre brott. På gatorna är han en känd knarklangare. Robin säger att han var på en fest i centrala Malmö, däremot kan ingen bekräfta att han var på denna fest.",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Anna",
        age: "48",
        image: "Bilder/suspects/Anna.png",
        text: "Gick hem från en AW och såg Klas räkna massor av kontanter bakom ett träd.",
        guilty: false

    }
];