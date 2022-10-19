export function arrayToMap<T extends Object>(arr: T[], keyAsId: string): Map<string, T> {
	return arr.reduce((nMap: Map<string, T>, cur: T) => {
		if (Object.keys(cur).find((k: string) => k === keyAsId)) {
			const k = cur[keyAsId] as string;
			nMap.set(k, cur);
		} else {
			throw new Error(`No key ${keyAsId} from for T`);
		}
		return nMap;
	}, new Map<string, T>());
}

export function mapMap<K, V>(omap: Map<K, V>, fn: (v: V, k: K) => V): Map<K, V> {
	const nmap: Map<K, V> = new Map<K, V>();
	for (let [key, val] of omap.entries()) {
		const res = fn(val, key);
		nmap.set(key, res);
	}
	return nmap;
}

export function mapReduce<K, V, T>(omap: Map<K, V>, fn: (tot: T, cur: V, key: K) => T, def: T): T {
	let val: T = def;
	omap.forEach((v: V, k: K) => {
		val = fn(val, v, k);
	});
	return val;
}