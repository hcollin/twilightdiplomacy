import testMap from "./data/testMap";
import { holdCommand, moveCommand, supportCommand } from "./game/commands";
import { processTurn } from "./game/processTurn";
import { Command, Game } from "./models/iGame";
import { arrayToMap } from "./utils/arrayToMap";
import { findUnitInArea } from "./utils/findUnit";
import { generateGame } from "./utils/generateGame";
import { showCommands, showMap } from "./utils/mapDIsp";
import { generatePlayer, getPlayerBySlot } from "./utils/playerUtils";

function main() {
	const p1 = generatePlayer("Red Faction", 0);
	const p2 = generatePlayer("Blue Faction", 1);

	let game = generateGame(testMap, [p1, p2]);

	const comms: string[][][] = [
		// Turn 1
		[
			["M A11 A12"], // P1
			["M A33 A23"], // P2
		],
        [
            ["M A12 A13"],
            ["M A23 A13"],
        ]
	];

	// Generate Test commands

    showMap(game);
	comms.forEach((turn: string[][]) => {
		turn.forEach((cmds: string[], index: number) => {
			const pl = getPlayerBySlot(game, index);

			cmds.forEach((cmd: string) => {
				game.commands.push(commandParser(game, cmd, pl.id));
			});
		});
        game = processTurn(game);
        
		showMap(game);
	});

	// const com1 = commandParser(game, "H A11", p1.id);

	

	// console.log(game);
}

/**
 * Parse string command to function
 *
 * Format is "CommandCode Area1 Area2 Area3"
 *
 * @param game
 * @param cmd
 */
function commandParser(game: Game, cmd: string, pid: string): Command {
	const cmdParts = cmd.split(" ");
	switch (cmdParts[0]) {
		case "H":
			return holdCommand(game, pid, cmdParts[1]);
		case "M":
			return moveCommand(game, pid, cmdParts[1], cmdParts[2]);
		case "S":
			return supportCommand(game, pid, cmdParts[1], cmdParts[2], cmdParts[3]);
		// case "C":
		//     return holdCommand(game, pid, cmdParts[1]);
		// case "B":
		//     return holdCommand(game, pid, cmdParts[1]);
		default:
			throw new Error(`Invalid command format ${cmd}`);
	}
}


function sortTest() {
	const arr: number[] = [2,3,4,8,2,4,6,5];
	console.log(arr);
	arr.sort((a, b) => a -b);
	console.log(arr);
}

main();

