import { Unit, UnitCode } from "./iUnit";

export interface MapData {
    homeAreas: AreaId[][];  // One array of area id¨s per player. This defines the player count for the map
    startingUnit: [AreaId, UnitCode][][] // AreaId and UnitCode
    areas: Area[],

}
export interface Area {
    id: AreaId;
    name: string; 
    city: boolean;
    type: AreaType;
    buildings: Building[];
    owner: string|null;
    nextTo: string[];
    flags: string[];
    unit: Unit|null;
}




export type Building = "F"|"M"|"B";

export type AreaType = "L"|"W"|"C"|"M"; // Land, Water, Coast, Mountain

export type AreaId = string;