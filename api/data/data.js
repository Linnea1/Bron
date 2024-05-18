const CLUES = [
    {
        id: 1,
        code: 2201,
        title: "Platsen för brottet",
        Locationimage: "Bilder/cluesPic/IMG_2448.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2466-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/IMG_2457-2.jpg",
        ClueText: "Blod vid mordplatsen.",
        shortText: "Här finns blod som polisen hittade på mordplatsen.",
        shortTextTwo: "Skoavtryck hittats på brottsplatsen.",
        text: "Leta vid utsiktsplats vid Casinot.",
        koordinater: [55.6018888889, 12.9905555556]

    },
    {
        id: 2,
        code: 6435,
        title: "Mordvapnet",
        Locationimage: "Bilder/cluesPic/IMG_2473-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2473-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/mordvapen.jpg",
        ClueText: "Soptunna där mordvapnet hittades.",
        shortText: "En kniv hittades av polisen i denna soptunnan, den matchar sticksåren Klas har.",
        shortTextTwo: "Detta är mordvapnet",
        text: "Leta efter en soptunna vid Korsbron.",
        koordinater: [55.60273330679147, 12.989689799850712]

    },
    {
        id: 3,
        code: 2753,
        title: "Klas kropp & obduktionsrapport",
        Locationimage: "Bilder/cluesPic/IMG_2485-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2485-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/Obduktion.png",
        ClueText: "Här hittades kroppen",
        shortText: "Kroppen hittades här.",
        shortTextTwo: "Obduktionsrapporten från Rättmedicinalverket.",
        text: "Leta vid kommendantbron.",
        koordinater: [55.60274002504842, 12.98863342662444]

    },
    {
        id: 4,
        code: 9063,
        title: "Bråk mellan Kristoffer och Klas",
        Locationimage: "Bilder/cluesPic/IMG_2491-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2491-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/ForhorExfrun.png",
        ClueText: "",
        shortText: "Det hölls ett förhör med Klas ex-fru.",
        shortTextTwo: "Förhörsprotokollet från Polisen.",
        text: "Leta vid andra sidan om utsiktsplatsen.",
        koordinater: [55.601486841708684, 12.991007360449684]

    },
    {
        id: 5,
        code: 3286,
        title: "Övervakningskamera",
        Locationimage: "Bilder/cluesPic/IMG_2494-2.jpg",
        Clueimage: "Bilder/cluesPic/camera.jpg",
        ClueimageTwo: "",
        ClueText: "",
        shortText: "Här syntes Kristoffer gå förbi vid 22-tiden.",
        shortTextTwo: "",
        text: "Leta vid Stadsbiblioteket.",
        koordinater: [55.60070902493853, 12.992975827879258]

    },
    {
        id: 6,
        code: 2009,
        title: "Samtalshistorik ",
        Locationimage: "Bilder/cluesPic/IMG_2500-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2500-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/SamtalslistaRobban.jpg",
        ClueText: "",
        shortText: "Denna samtalshistorik är intressant. ",
        shortTextTwo: "Samtalshistoriken på Klas telefon.",
        text: "Leta vid Casinots parkering.",
        koordinater: [55.6023457476268, 12.993715862892756]

    },
    {
        id: 7,
        code: 9782,
        title: "Görans rörelsemönster",
        Locationimage: "Bilder/cluesPic/IMG_2415-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2415-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/GoranRorelsemonster.png",
        ClueText: "",
        shortText: "",
        shortTextTwo: "Görans rörelsemönster. Screenshot från uber-appen. Dekalerna visar vart han har stannat.",
        text: "Leta vid utkanten av parken.",
        koordinater: [55.60311293989448, 12.993955302221526]

    },
    {
        id: 8,
        code: 2840,
        title: "Eriks stämpelkort",
        Locationimage: "Bilder/cluesPic/IMG_2407-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2407-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/erikPasserKortPic.png",
        ClueText: "",
        shortText: "Polisen har fått Eriks stämpelkort.",
        shortTextTwo: "Erik är anställd på Casinot. Detta är hans stämpelkort under natten då Klas blev mördad.",
        text: "Leta vid Casinot.",
        koordinater: [55.60281774559934, 12.992845968941214]

    },
    {
        id: 9,
        code: 8414,
        title: "Annas POV & Klas sms till Göran",
        Locationimage: "Bilder/cluesPic/IMG_2424-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2424-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/Konversation_Klas_Goran.jpg",
        ClueText: "",
        shortText: "Här stod Anna när hon såg en man räkna pengar och det verkar även som att Klas skickat sms denna kvällen.",
        shortTextTwo: "Konversation mellan Klas och Göran.",
        text: "Leta vid vattnet bakom casinot.",
        koordinater: [55.60330497986649, 12.991905874812316]

    },
    {
        id: 10,
        code: 5040,
        title: "Förhör med Erik",
        Locationimage: "Bilder/cluesPic/IMG_2438-2.jpg",
        Clueimage: "Bilder/cluesPic/IMG_2438-2.jpg",
        ClueimageTwo: "Bilder/cluesPic/ForhorErik.png",
        ClueText: "",
        shortText: "Förhöret med Erik tog en vändning.",
        shortTextTwo: "Förhörsprotokollet från Polisen.",
        text: "Leta vid lekplatsen bakom Casinot.",
        koordinater: [55.602834214779286, 12.991397573761436]

    }
];

const SUSPECTS = [
    {
        suspectId: 1,
        name: "Kristoffer Holm",
        age: "50",
        securityNumber: "19740515-4973",
        relationship: "Gift",
        image: "Bilder/suspects/kristoffer.jpg",
        text: "Kristoffer är advokat och kände Klas då han har barn med Kristoffers nya fru. Kristoffers alibi var att han var hemma med barnen medan hans fru var bortrest.",
        guilty: false

    },
    {
        suspectId: 2,
        name: "Göran Berg",
        age: "57",
        securityNumber: "19671105-2391",
        relationship: "Singel",
        image: "Bilder/suspects/Goran.png",
        text: "Göran hade blivit av med sitt jobb som kock och jobbade vid tillfället för Uber. Det är genom Görans gamla jobb som han lärde känna Klas och har därefter varit vänner.",
        guilty: true

    },
    {
        suspectId: 3,
        name: "Erik Lindqvist",
        age: "34",
        securityNumber: "19900203-4255",
        relationship: "Förhållande",
        image: "Bilder/suspects/Erik.png",
        text: "Erik jobbade som bartender inne på casinot och såg när Göran vann stora summor pengar. Enligt kollegor kom han in på jobbet med smutsiga skor och stod inte bakom bardisken hela kvällen. ",
        guilty: false

    },
    {
        suspectId: 4,
        name: "Robin Wallin",
        age: "30",
        securityNumber: "19940918-2741",
        relationship: "Singel",
        image: "Bilder/suspects/Robin.jpg",
        text: "Robin hade vid mord tillfället precis kommit ut från fängelset, dömd för mord- och rånförsök. Han är även känd hos polisen för att sälja droger i centrala Malmö. Enligt Robin själv var han på en fest i närheten, däremot fanns ingen som kunde bekräfta att han var där. ",
        guilty: false

    },
    {
        suspectId: 5,
        name: "Anna Håkansson",
        age: "48",
        securityNumber: "19760109-4285",
        relationship: "Förhållande",
        image: "Bilder/suspects/Anna.png",
        text: "Anna gick genom parken efter en afterwork med Åhléns, i samband med att mordet skedde. Hon såg en man, som liknade Klas, göra något underligt. Enligt Anna ska mannen ha sett väldigt glad ut. ",
        guilty: false

    }
];