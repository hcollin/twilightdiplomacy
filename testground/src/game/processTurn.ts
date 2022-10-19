import { Command, CommandCode, Game } from "../models/iGame";
import { Area, AreaId } from "../models/iMap";
import { mapReduce } from "../utils/arrayToMap";
import { findCommandsForArea } from "../utils/commandUtils";
import { findUnitInArea } from "../utils/findUnit";
import { hasFlag } from "../utils/Flags";

export interface CommandInProcess extends Command {
	cmdId: string;
	power: number;
	interrupted: boolean;
	destroyed: boolean;
	success: boolean;
	resolved: boolean;
}

export interface GameInProcess extends Game {
	originalCommands: Command[];
	commands: CommandInProcess[];
}

export function processTurn(game: Game): Game {
	const process: GameInProcess = {
		...game,
		originalCommands: [...game.commands],
		commands: game.commands.map((c: Command, index: number) => {
			return {
				...c,
				cmdId: `cmd-${game.turn}-${index}`,
				power: 0,
				interrupted: false,
				destroyed: false,
				success: false,
				resolved: false,
			};
		}),
	};

	process.commands = interruptCommands(process.commands);
	process.commands = calculateCommandPower(process, process.commands);

	const process2 = solveEachMovement(process);
	// console.log("\n\n", process2.commands);

	process2.map = parseOwnerShip(process2);
	const process3 = processEconomy(process2);

	process3.turn++;

	return {
		commands: [],
		map: process3.map,
		players: process3.players,
		turn: process3.turn,
		oldCommands: [...process3.oldCommands, process3.commands],
	};
}

/**
 * Interrupt Supports that are under attack
 *
 * @param cmds
 * @returns
 */
function interruptCommands(cmds: CommandInProcess[]): CommandInProcess[] {
	const origCmds = [...cmds];

	return cmds.map((cmd: CommandInProcess) => {
		// Move and hold commands cannot be interrupted
		if (cmd.commandType === "H" || cmd.commandType === "M") return cmd;

		const attack = origCmds.find((c: CommandInProcess) => {
			return c.commandType === "M" && c.player !== cmd.player && c.areas[1] === cmd.areas[0];
		});
		if (attack === undefined) {
			cmd.resolved = true;
			cmd.success = true;
			return cmd;
		}

		cmd.interrupted = true;
		return cmd;
	});
}

function calculateCommandPower(game: GameInProcess, cmds: CommandInProcess[]): CommandInProcess[] {
	const origCmds = [...cmds];

	return cmds.map((cmd: CommandInProcess) => {
		if (cmd.commandType === "B") return cmd;
		if (cmd.commandType === "C") return cmd;

		const unit = findUnitInArea(game, cmd.areas[0], cmd.player);

		let power = unit.power;

		// Support for my hold
		if (cmd.commandType === "H" || cmd.interrupted === true) {
			if (hasFlag(unit.flags, "HoldsWith1")) power = 1;

			// find commands supporting my hold
			origCmds.forEach((c: CommandInProcess) => {
				if (c.commandType === "S" && c.areas[1] === cmd.areas[0] && c.interrupted === false) {
					const supportUnit = findUnitInArea(game, c.areas[0]);
					if (supportUnit) {
						power += supportUnit.power;
						if (hasFlag(supportUnit.flags, "SupportPlus2")) {
							power += 2;
						}
					}
				}
			});
		}

		// Support for my Move
		if (cmd.commandType === "M") {
			// find commands supporting my move
			origCmds.forEach((c: CommandInProcess) => {
				if (c.commandType === "S" && c.areas[1] === cmd.areas[0] && c.areas[2] === cmd.areas[1] && c.interrupted === false) {
					const supportUnit = findUnitInArea(game, c.areas[0]);
					if (supportUnit) {
						power += supportUnit.power;
						if (hasFlag(supportUnit.flags, "SupportPlus2")) {
							power += 2;
						}
					}
				}
			});
		}

		cmd.power = power;

		return cmd;
	});
}

// function solveEachMovement(game: GameInProcess, runner?: number): GameInProcess {

//     const counter = runner || 1;

//     game.commands = game.commands.map((cmd: CommandInProcess) => {
// 		const activeUnit = findUnitInArea(game, cmd.areas[0]);

// 		if (cmd.commandType === "M") {
// 			const targetAreaId = cmd.areas[1];
// 			const unitInTargetArea = findUnitInArea(game, targetAreaId);

//             // Moving to empty area
// 			if (unitInTargetArea === null) {

// 				const newArea = game.map.get(targetAreaId);
// 				newArea.unit = { ...activeUnit };
// 				const oldArea = game.map.get(cmd.areas[0]);
// 				oldArea.unit = null;

//                 cmd.success = true;
//                 cmd.resolved = true;
// 				return cmd;
// 			}

// 		}

// 		if (cmd.commandType === "H" || cmd.interrupted === true) {
// 			// Check if there are any move commands affecting this area
// 			const movingHere = game.commands.filter((c: CommandInProcess) => c.areas[1] === cmd.areas[0] && c.commandType === "M");
// 			if (movingHere.length === 0) {
// 				cmd.success = true;
// 				cmd.resolved = true;
// 				return cmd;
// 			}
// 		}

// 		return cmd;
// 	});

//     const unresolvedCommands = game.commands.filter((c: CommandInProcess) => c.resolved === false);
//     if(unresolvedCommands.length > 0) {
//         if(counter < 10) {
//             return solveEachMovement({...game}, counter + 1);
//         } else {
//             throw new Error(`Solve counter exeeds 10. Something may be broken.`);
//         }

//     }

// 	return { ...game };
// }

function solveEachMovement(game: GameInProcess, runner: number = 0): GameInProcess {
	return solveSingleArea(game);

	// return { ...game };
}

function findAreaIdWithUnsolvedCommands(game: GameInProcess): AreaId | null {
	for (let a of game.map.values()) {
		const cmds = findCommandsForArea(game, a.id).filter((c) => c.resolved === false);
		if (cmds.length > 0) return a.id;
	}
	return null;
}

function solveSingleArea(game: GameInProcess, counter?: number): GameInProcess {
	const aid = findAreaIdWithUnsolvedCommands(game);

	// No unsolved areas, stop recursion
	if (aid === null) return { ...game };

	const area = game.map.get(aid);

	const cmds = findCommandsForArea(game, aid);

	// Find Defender, if any
	const defender = cmds.find((c) => c.areas[0] === aid);

	// Are there more than 1 move?
	const movers = cmds.filter((c) => c.commandType === "M");
	let attacker: CommandInProcess | null = null;

	// Only one attacker
	if (movers.length === 1) attacker = movers[0];

	// More than one attacker
	if (movers.length > 1) {
		movers.sort((a, b) => a.power - b.power);
		const att = movers.reduce(
			(winner, cur: CommandInProcess, index: number) => {
				if (winner.winner === null) return { maxPower: cur.power, winner: cur };
				if (cur.power > winner.maxPower) return { maxPower: cur.power, winner: cur };
				if (cur.power === winner.maxPower) return { maxPower: winner.maxPower, winner: null };
				return winner;
			},
			{
				maxPower: 0,
				winner: null,
			} as { maxPower: number; winner: null | CommandInProcess },
		);

		// Selected attacker
		attacker = att.winner;

		// Set rest of the commands to resolved
		movers.forEach((c) => {
			if (!attacker || c.cmdId !== attacker.cmdId) {
				c.success = false;
				c.resolved = true;
			}
		});
	}

	if (!attacker) {
		// Defender wins
		if (defender) {
			defender.success = true;
			defender.resolved = true;
		}
	} else {
		if (!defender || defender.power < attacker.power) {
			// Attacker Wins
			if (defender) {
				defender.success = false;
				defender.resolved = true;
				defender.destroyed = true;
			}

			const attArea = game.map.get(attacker.areas[0]);
			area.unit = { ...attArea.unit };
			attArea.unit = null;

			attacker.success = true;
			attacker.resolved = true;
		}
	}

	// console.log(`Combat in ${aid}:\nDef`, defender, "\nAtt:", attacker, "\n");

	if (counter > 100) {
		console.warn(`Endless loop!`);
		return { ...game };
	}

	return solveSingleArea({ ...game }, counter + 1);
}

function parseOwnerShip(game: Game): Map<string, Area> {
	game.map.forEach((a: Area) => {
		if (a.unit) {
			a.owner = a.unit.owner;
		}
	});
	return game.map;
}

/**
 * How to calculate attack results
 *
 * Check if any supporting units are attacked (somebody tries to move there), that order is interrupted
 * Then calculate the power of any move and or hold order
 * If there are multiple attackers to a single area, only the largest one will start the attack agains the owner, rest fail.
 *
 */

function getCommandsTargetingArea(game: GameInProcess, aid: AreaId, type?: CommandCode): CommandInProcess[] {
	return game.commands.filter((c: CommandInProcess) => {
		if (type !== undefined && type !== c.commandType) return false;
		return c.areas[c.areas.length - 1] === aid;
	});
}

function findAreaDefender(game: GameInProcess, aid: AreaId): CommandInProcess {
	const defs = game.commands.filter((c: CommandInProcess) => {
		if (c.areas[0] === aid) return true;

		return false;
	});
	return defs[0];
}

function processEconomy(game: GameInProcess): GameInProcess {
	game.players.forEach((p) => {
		const moreMoney = mapReduce<AreaId, Area, number>(
			game.map,
			(num: number, a: Area, k: AreaId) => {
				
				if (a.owner === p.id) {
					
					if (a.city) {
						return num + 2;
					} else {
						return num + 1;
					}
				}
				return num;
			},
			0,
		);
		// console.log(p.id, p.money, moreMoney);
		p.money += moreMoney;
	});

	return { ...game };
}
