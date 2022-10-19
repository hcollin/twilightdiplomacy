import { Area, MapData } from "../models/iMap";

const areas: Area[] = [
    {
        id: "lappi",
        name: "Lappi",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["ppohj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "ppohj",
        name: "Pohjois-Pohjanmaa",
        buildings: [],
        city: true,
		type: "L",
		nextTo: ["lappi", "kpohj", "keskis", "psavo", "kainuu"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "kainuu",
        name: "Kainuu",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["ppohj", "psavo", "pkarj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "kpohj",
        name: "Keski-Pohjanmaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["ppohj", "keskis", "epohj", "pohj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "keskis",
        name: "Keskisuomi",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["ppohj", "kpohj", "psavo", "esavo", "epohj", "pirka", "phame"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "psavo",
        name: "Pohjois-Savo",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["ppohj", "kainuu", "pkarj", "esavo", "keskis"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "pkarj",
        name: "Pohjois-Karjala",
        buildings: [],
        city: true,
		type: "L",
		nextTo: ["kainuu", "psavo", "esavo", "ekarj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "esavo",
        name: "Etelä-Savo",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["keskis", "psavo", "pkarj", "phame", "kymi", "ekarj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "epohj",
        name: "Etelä-Pohjanmaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["kpohj", "keskis", "pirka", "pohj", "satak"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "pirka",
        name: "Pirkanmaa",
        buildings: [],
        city: true,
		type: "L",
		nextTo: ["keskis", "epohj", "satak", "kantah", "varss", "phame"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "kantah",
        name: "Kanta-Häme",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["pirka", "varss", "luusi", "kuusi", "phame"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "pohj",
        name: "Pohjanmaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["kpohj", "epohj", "satak"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "satak",
        name: "Satakunta",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["epohj", "pirka", "pohj", "varss"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "varss",
        name: "Varsinais-Suomi",
        buildings: [],
        city: true,
		type: "L",
		nextTo: ["pirka", "kantah", "satak", "luusi", "ahv"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "luusi",
        name: "Länsi-Uusimaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["kantah", "varss", "kuusi", "pks"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "kuusi",
        name: "Keski-Uusimaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["kantah", "luusi", "iuusi", "phame", "pks"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "iuusi",
        name: "Itä-Uusimaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["kuusi", "phame", "kymi", "pks"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "phame",
        name: "Päijät-Häme",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["keskis", "esavo", "pirka", "kantah", "kuusi", "iuusi", "kymi"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "kymi",
        name: "Kymenlaako",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["esavo", "iuusi", "phame", "ekarj"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "ekarj",
        name: "Etelä-Karjala",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["pkarj", "esavo", "kymi"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "pks",
        name: "Pääkaupunki",
        buildings: [],
        city: true,
		type: "L",
		nextTo: ["luusi", "kuusi", "iuusi"],
		owner: null,
        flags: [],
		unit: null
    },
    {
        id: "ahv",
        name: "Ahvenanmaa",
        buildings: [],
        city: false,
		type: "L",
		nextTo: ["varss"],
		owner: null,
        flags: [],
		unit: null
    },
];

const testMap2: MapData = {
    areas: areas,
    homeAreas: [
        ["ppohj"],
        ["pks"],
        ["varss"],
        ["pirka"],
        ["pkarj"],
    ],
    startingUnit: [
        [ ["ppohj", "I"], ],
        [ ["pks", "I"], ],
        [ ["varss", "I"], ],
        [ ["pirka", "I"], ],
        [ ["pkarj", "I"], ],
        
        
    ]
}

export default testMap2;