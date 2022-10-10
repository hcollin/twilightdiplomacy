import { Game } from "../models/iGame";
import { Area, AreaId, MapData } from "../models/iMap";
import { Player } from "../models/iPlayer";
import { Unit, UnitCode } from "../models/iUnit";
import { arrayToMap } from "./arrayToMap";
import { mapGenerator } from "./mapGenerator";
import { unitFactory } from "./unitUtils";

export function generateGame(gameMap: MapData, playerArray: Player[]): Game {
	const players = arrayToMap<Player>(playerArray, "id");

	// Create initial game with empty map
	const game: Game = {
		map: mapGenerator(gameMap),
		// units: generateUnitMap(gameMap, players),
		players: players,
		turn: 0,
		commands: [],
		oldCommands: []
	};

	gameMap.homeAreas.forEach((homes: string[], index) => {
		const p = getPlayerBySlot(players, index);
		homes.forEach((aid: AreaId) => {
			const area = game.map.get(aid);
			area.owner = p.id;
			game.map.set(aid, area);
		});
	});

	game.map = placeUnitsToMap(gameMap, game);

	return game;
}

function placeUnitsToMap(mapData: MapData, game: Game): Map<string, Area> {

	mapData.startingUnit.forEach((units: [string, UnitCode][], index: number) => {
		const p = getPlayerBySlot(game.players, index);

		units.forEach((unitPos: [AreaId, UnitCode]) => {
			const area = game.map.get(unitPos[0]);
			area.unit = unitFactory(unitPos[1], p.id);
			game.map.set(area.id, area);
		});
	});

	return game.map;
}

function getPlayerBySlot(players: Map<string, Player>, slot: number): Player {
	for (let value of players.values()) {
		if (value.slotNumber === slot) {
			return value;
		}
	}
	throw new Error(`No slot number ${slot} found from players.`);
}
