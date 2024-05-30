export {};

declare global {
	interface Array<T> {
		forAsync<T>(
			callbackfn: (value: T, index: number, array: T[]) => Promise<void>,
		): Promise<void>;
		mapAsync<U>(
			callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
		): Promise<U[]>;
	}
}

Array.prototype.forAsync = async function (
	callbackfn: (value: any, index: number, array: any[]) => Promise<void>,
) {
	let result = [];
	for (let i = 0; i < this.length; i++) {
		result.push(callbackfn(this[i], i, this));
	}
	await Promise.all(result);
};

Array.prototype.mapAsync = async function <U>(
	callbackfn: (value: any, index: number, array: any[]) => Promise<U>,
) {
	const result = [];
	for (let i = 0; i < this.length; i++) {
		result.push(callbackfn(this[i], i, this));
	}
	return Promise.all(result);
};
