import { CommandInProcess } from "../game/processTurn";
import { Command, Game } from "../models/iGame";
import { Area } from "../models/iMap";

export function showMap(game: Game) {
	let i = 0;
	let str = "\n";
	game.map.forEach((a: Area) => {
		str += showArea(game, a);
		i++;
		if (i > 2) {
			i = 0;
			str += "\n";
		}
	});
    
    console.log(`\n# Turn ${game.turn}\n`);
    showCommands(game);
    console.log(`${str}\n`);

	// console.log(`\nTurn: ${game.turn}\n${showCommands(game)}\n${str}\n\n`);
}

function showArea(game: Game, area: Area): string {
	let char = ".";
	if (area.city) char = "o";
	if (area.unit !== null) {
		char = area.unit.code;

		if (!area.city) {
			char = char.toLowerCase();
		}
	}

	if (area.owner === null) {
		return `\x1b[0m${char}`;
	}

	const p = game.players.get(area.owner);
	if (p) {
		return `${p.color}${char}\x1b[0m`;
	}
	return `${char}`;
}

export function showCommands(game: Game, targetTurn?: number) {
    const turn = targetTurn || game.turn - 1;
    if(!game.oldCommands[turn]) return;

	game.oldCommands[turn].forEach((c: CommandInProcess) => {
		console.log(`${c.commandType} ${c.areas.join(" ")}: ${c.success ? "Succeeded" : "Failed"}`);
	});
}


export function showData(game: Game) {

	game.players.forEach(p => {
		console.log(`${[p.factionName]} : ${p.money}`);
	})

}