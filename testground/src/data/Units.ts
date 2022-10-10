import { UnitType, UnitCode } from "../models/iUnit";


export const Infantry: UnitType = {
    code: "I",
    cost: 3,
    power: 1,
    typeName: "Infantry",
    flags: [],
};

export const Tank: UnitType = {
    code: "T",
    cost: 7,
    power: 2,
    typeName: "Tank",
    flags: ["HoldsWith1"],
};

export const Naval: UnitType = {
    code: "N",
    cost: 7,
    power: 3,
    typeName: "Naval Fleet",
    flags: [],
};

export const Artillery: UnitType = {
    code: "A",
    cost: 5,
    power: 1,
    typeName: "Artillery",
    flags: ["SupportPlus2"],
};

export const Planes: UnitType = {
    code: "P",
    cost: 12,
    power: 2,
    typeName: "Airplanes",
    flags: [],
};