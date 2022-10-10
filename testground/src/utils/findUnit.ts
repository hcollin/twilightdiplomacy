import { Game } from "../models/iGame";
import { AreaId } from "../models/iMap";
import { Unit } from "../models/iUnit";



export function findUnitInArea(game: Game, aid: AreaId, pid?: string): Unit|null {
    
    const area = game.map.get(aid);
    return area.unit;
}