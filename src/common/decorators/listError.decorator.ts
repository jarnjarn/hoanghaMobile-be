import { ApiException } from '../errors/api.error';

// create class decorator ListError
export function Errors(target: any): void {
	for (const key in target) {
		let first = target[key];
		if (first instanceof ApiException) {
			target[key] = new ApiException(
				first.message,
				first.getStatus(),
				key,
			);
		}
	}
}
