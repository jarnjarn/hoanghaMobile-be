import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
	private readonly code: string;

	public getCode(): string {
		return this.code;
	}
	constructor(message: string, statusCode: number, code: string = '') {
		super(message, statusCode);
		this.code = code;
	}
}
