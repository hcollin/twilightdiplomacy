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
    buildings: Building[];
    owner: string|null;
    nextTo: string[];
    flags: string[];
    unit: Unit|null;
}




export type Building = "F"|"M"|"B";

export type AreaId = string;