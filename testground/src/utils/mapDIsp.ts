import { Game } from "../models/iGame";
import { Area } from "../models/iMap";


export function showMap(game: Game) {

    let i = 0;
    let str = "\n";
    game.map.forEach((a: Area) => {
        str += showArea(game, a);
        i++;
        if(i > 2) {
            i = 0;
            str += "\n";
        }
    });


    console.log(`\nTurn: ${game.turn}\n${str}\n\n`);

}


function showArea(game: Game, area: Area): string {

    let char = ".";
    if(area.city) char = "o";
    if(area.unit !== null)  {
        char = area.unit.code;

        if(!area.city) {
            char = char.toLowerCase();
        }
    }

    if(area.owner === null) {
        return `\x1b[0m${char}`
    }

    const p = game.players.get(area.owner);
    if(p) {
        return `${p.color}${char}\x1b[0m`;    
    }
    return `${char}`;

}

