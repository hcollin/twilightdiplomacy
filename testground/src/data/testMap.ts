import { Area, MapData } from "../models/iMap";

const areas: Area[] = [
	{
		id: "A11",
		name: "Area 11",
		buildings: [],
		city: true,
		nextTo: ["A12", "A21"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A12",
		name: "Area 12",
		buildings: [],
		city: false,
		nextTo: ["A11", "A13", "A22"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A13",
		name: "Area 13",
		buildings: [],
		city: true,
		nextTo: ["A12", "A23"],
		owner: null,
        flags: [],
		unit: null
	},

	{
		id: "A21",
		name: "Area 21",
		buildings: [],
		city: false,
		nextTo: ["A22", "A11", "A31"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A22",
		name: "Area 22",
		buildings: [],
		city: false,
		nextTo: ["A21", "A23", "A12", "A32"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A23",
		name: "Area 23",
		buildings: [],
		city: false,
		nextTo: ["A22", "A13", "A33"],
		owner: null,
        flags: [],
		unit: null
	},

	{
		id: "A31",
		name: "Area 31",
		buildings: [],
		city: true,
		nextTo: ["A32", "A21"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A32",
		name: "Area 32",
		buildings: [],
		city: false,
		nextTo: ["A31", "A33", "A22"],
		owner: null,
        flags: [],
		unit: null
	},
	{
		id: "A33",
		name: "Area 33",
		buildings: [],
		city: true,
		nextTo: ["A32", "A23"],
		owner: null,
        flags: [],
		unit: null
	},
];

const testMap: MapData = {
    areas: areas,
    homeAreas: [
        ["A11"],
        ["A33"],
    ],
    startingUnit: [
        [ ["A11", "I"], ],
        [ ["A33", "I"], ],
    ]
}

export default testMap;