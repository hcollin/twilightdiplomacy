import { Area, MapData } from "../models/iMap";

export function mapGenerator(data: MapData): Map<string, Area> {
	// Setup Areas
	const areas = data.areas.reduce((gameMap: Map<string, Area>, a: Area) => {
		gameMap.set(a.id, a);
		return gameMap;
	}, new Map<string, Area>());

	validateMap(areas);

	return areas;
}

function validateMap(gameMap: Map<string, Area>): boolean {
	const errs: string[] = [];

	gameMap.forEach((area: Area) => {
		// Area cannot refer to itself
		if (area.nextTo.find((v: string) => v === area.id) !== undefined) {
			errs.push(`Area ${area.id}: Cannot be next to itself`);
		}

		area.nextTo.forEach((nid: string) => {
			// Check that area exists
			if (!gameMap.has(nid)) {
				errs.push(`Area ${area.id}: Unknown nextTo Area ${nid} `);
			}

			// Both areas must refer to eachother
			const nextTo = gameMap.get(nid);
			if (nextTo) {
				if (nextTo.nextTo.find((v) => v === area.id) === undefined) {
					errs.push(`Area ${nextTo.id}: Is not referring back to ${area.id}`);
				}
			}
		});
	});
	if (errs.length > 0) {
		console.error("\n", errs, "\n\n");
		throw new Error("Invalid Map Data");
	}
	// errs.length > 0 && console.log(errs);
	return errs.length === 0;
}
