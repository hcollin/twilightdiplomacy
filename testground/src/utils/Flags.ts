


export type Flags = string[];

export function hasFlag(flags: Flags, flag: string): boolean {
    return flags.find((f: string) => f === flag) !== undefined;
}
