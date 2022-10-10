import { CommandInProcess } from "../game/processTurn";
import { Area, AreaId } from "./iMap";
import { Player } from "./iPlayer";



export interface Game {
    map: Map<string, Area>;
    // units: Map<string, Unit>;
    players: Map<string, Player>;
    turn: number;
    commands: Command[];
    oldCommands: CommandInProcess[][];
}


export interface Command {
    turn: number;
    player: string;
    commandType: CommandCode;
    unitId: string;
    areas: AreaId[];
    flags: string[];
}

export type CommandCode = "M"|"S"|"H"|"C"|"B";