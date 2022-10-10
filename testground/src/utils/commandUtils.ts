import { CommandInProcess, GameInProcess } from "../game/processTurn";
import { Area, AreaId } from "../models/iMap";



export function findCommandsForArea(game: GameInProcess, aid: AreaId ): CommandInProcess[] {
    
		return game.commands.filter((cmd: CommandInProcess) => {
			// Moving to this area
			if (cmd.commandType === "M" && cmd.areas[1] === aid) {
				return true;
			}

			// Holding in this area (Holding or interrupted)
			if ((cmd.commandType === "H" || cmd.interrupted) && cmd.areas[0] === aid) {
				return true;
			}
		});
}