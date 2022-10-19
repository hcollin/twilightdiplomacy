import { Command, Game } from "../models/iGame";
import { Area, AreaId } from "../models/iMap";
import { Player } from "../models/iPlayer";
import { mapReduce } from "../utils/arrayToMap";
import { CommandInProcess } from "./processTurn";


export function serializeGame(game: Game): string {
   
    const areas: Area[] = mapReduce(game.map, (arr: Area[], area: Area) => {
        arr.push(area);
        return arr;
    }, []);

    const players: Player[] = mapReduce(game.players, (arr: Player[], pl: Player) => {
        arr.push(pl);
        return arr;
    }, []);

    return JSON.stringify({
        map: JSON.stringify(areas),
        players: JSON.stringify(players),
        turn: game.turn,
        commands: JSON.stringify(game.commands),
        oldCommands: JSON.stringify(game.oldCommands)
    });
}



export function unserializeGame(str: string): Game {

    const gp: {
        map: string;
        // units: Map<string, Unit>;
        players: string;
        turn: number;
        commands: Command[];
        oldCommands: CommandInProcess[][];
        
    } = JSON.parse(str);

    const g: Game = {
        turn: gp.turn,
        commands: gp.commands,
        oldCommands: gp.oldCommands,
        map: JSON.parse(gp.map).reduce((am, area) => {
            am.set(area.id, area);
            return am;
        }, new Map<AreaId, Area>()),
        players: JSON.parse(gp.players).reduce((pm, pla) => {
            pm.set(pla.id, pla);
            return pm;
        }, new Map<string, Player>()),
    };

    return g;
    


}