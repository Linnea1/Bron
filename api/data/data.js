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
        koordinater: [55.61069245963668, 12.995255796049829]
    },
];

const SUSPECTS = [
    {
        suspectId: 1,
        name: "Kristoffer",
        age: "50",
        image: "Bilder/suspects/kristoffer.jpg",
        text: "Kristoffer är advokat och kände Klas då han har barn med Kristoffers nya fru. Kristoffers alibi var att han var hemma med barnen medan hans fru var bortrest.",
        guilty: false

    },
    {
        suspectId: 2,
        name: "Göran",
        age: "57",
        image: "Bilder/suspects/Goran.png",
        text: "Göran hade blivit av med sitt jobb som kock och jobbade vid tillfället för Uber. Det är genom Görans gamla jobb som han lärde känna Klas och har därefter varit vänner.",
        guilty: true

    },
    {
        suspectId: 3,
        name: "Erik",
        age: "34",
        image: "Bilder/suspects/Erik.png",
        text: "Erik jobbade som bartender inne på casinot och såg när Göran vann stora summor pengar. Enligt kollegor kom han in på jobbet med smutsiga skor och stod inte bakom bardisken hela kvällen. ",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Robin",
        age: "30",
        image: "Bilder/suspects/Robin.jpg",
        text: "Robin hade vid mord tillfället precis kommit ut från fängelset, dömd för mord- och rånförsök. Han är även känd hos polisen för att sälja droger i centrala Malmö. Enligt Robin själv var han på en fest i närheten, däremot fanns ingen som kunde bekräfta att han var där. ",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Anna",
        age: "48",
        image: "Bilder/suspects/Anna.png",
        text: "Anna gick genom parken efter en afterwork, i samband med att mordet skedde. Hon såg en man, som liknade Klas, göra något underligt. Enligt Anna ska mannen ha sett väldigt glad ut. ",
        guilty: false

    }
];