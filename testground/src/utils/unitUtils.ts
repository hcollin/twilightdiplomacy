import { Artillery, Infantry, Naval, Planes, Tank } from "../data/Units";
import { CommandCode } from "../models/iGame";
import { AreaId } from "../models/iMap";
import { Unit, UnitCode, UnitType } from "../models/iUnit";

const UNITTYPES: Record<UnitCode, UnitType> = {
	I: Infantry,
	N: Naval,
	T: Tank,
	A: Artillery,
	P: Planes,
};

export function unitFactory(uc: UnitCode, pid: string): Unit {
	const unitType = UNITTYPES[uc];

	const unit: Unit = {
		...unitType,
		owner: pid,
		id: unitIdGenerator(uc, pid),
	};

	return unit;
}

function unitIdGenerator(uc: UnitCode, pid: string): string {
	return `${uc}-${pid}-${Math.round(Math.random() * 99999) + 1}`;
}
