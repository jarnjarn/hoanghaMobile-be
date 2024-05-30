import { ApiException } from '../errors/api.error';

export {};

declare global {
	interface Promise<T> {
		orThrow(error: ApiException): Promise<T>;
		orElse<T>(elses: T): Promise<T>;
		ifData<U>(callback: (output: T) => U, value: T): Promise<T>;
		ifThrow<U>(callback: (output: T) => U, error: ApiException): Promise<T>;
		getField<U>(field: string): Promise<U>;
	}
}

Promise.prototype.orThrow = function (error: ApiException) {
	// check if data is null or undefined
	return this.then((data) => {
		if (data == null) {
			throw error;
		}
		return data;
	});
};

Promise.prototype.orElse = function (elses: any) {
	// check if data is null or undefined
	return this.then((data) => {
		if (data == null || data === undefined) {
			data = elses;
			return elses;
		}
		return data;
	});
};
Promise.prototype.ifData = function (callback: Function, value: any) {
	// check if data is null or undefined
	return this.then((data) => {
		if (callback(data)) {
			return value;
		}
		return data;
	});
};
Promise.prototype.ifThrow = function (callback: Function, error: ApiException) {
	// check if data is null or undefined
	return this.then((data) => {
		if (callback(data)) {
			throw error;
		}
		return data;
	});
};
Promise.prototype.getField = function (key) {
	// check if data is null or undefined
	return this.then((data) => {
		if (data == null || data === undefined) {
			return null;
		}
		return Object.keys(data).length ? data[key] : null;
	});
};
