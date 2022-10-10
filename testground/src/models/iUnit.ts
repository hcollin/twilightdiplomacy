import { Flags } from "../utils/Flags";
import { AreaId } from "./iMap";

// Generic unit information
export interface UnitType {
	typeName: string;
	code: UnitCode;
	power: number;
	cost: number;
	flags: Flags;
    
}

// Data referring to a specific Unit
export interface Unit extends UnitType {
	id: string;
	owner: string;
}

export type UnitCode = "I" | "N" | "T" | "A" | "P";
