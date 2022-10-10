import { Command, Game } from "../models/iGame";
import { AreaId } from "../models/iMap";
import { findUnitInArea } from "../utils/findUnit";



export function holdCommand(game: Game, pid: string, aid: AreaId): Command {
    const unit = findUnitInArea(game, aid, pid);

    if(!unit) {
        throw new Error(`Player ${pid} cannot issue a HOLD command to unit in area ${aid}`);
    }
    const c: Command = {
        areas: [aid],
        commandType: "H",
        flags: [],
        player: pid,
        turn: game.turn,
        unitId: unit.id
    };

    return c;
}


export function moveCommand(game: Game, pid: string, from: AreaId, to: AreaId): Command {
    const unit = findUnitInArea(game, from, pid);

    if(!unit) {
        throw new Error(`Player ${pid} cannot issue a MOVE command to unit in area ${from}`);
    }

    const c: Command = {
        areas: [from, to],
        commandType: "M",
        flags: [],
        player: pid,
        turn: game.turn,
        unitId: unit.id
    };

    return c;
}

export function supportCommand(game: Game, pid: string, aid: AreaId, from: AreaId, to: AreaId): Command {
    const unit = findUnitInArea(game, from, pid);

    if(!unit) {
        throw new Error(`Player ${pid} cannot issue a SUPPORT command to unit in area ${aid}`);
    }

    const c: Command = {
        areas: [aid, from, to],
        commandType: "S",
        flags: [],
        player: pid,
        turn: game.turn,
        unitId: unit.id

    };

    return c;
}

