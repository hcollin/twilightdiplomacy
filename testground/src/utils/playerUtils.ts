import { Game } from "../models/iGame";
import { Player } from "../models/iPlayer";

const COLORS: string[] = [
    "\x1b[41m",
    "\x1b[44m",
    "\x1b[42m",
    "\x1b[43m",
]

export function generatePlayer(name: string, slot: number): Player {
    const p: Player = {
        factionName: name,
        slotNumber: slot,
        id: `pl_${slot}`,
        color: COLORS[slot],
    };

    return p;
}



export function getPlayerBySlot(game: Game, slot: number): Player|null {
    for(let p of game.players.values()) {
        if(p.slotNumber === slot) return p;
    }
    return null;
}