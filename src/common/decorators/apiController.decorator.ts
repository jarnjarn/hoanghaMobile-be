import {
	applyDecorators,
	ClassSerializerInterceptor,
	Controller,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseGuard } from '../guards/firebase.guard';

export function ApiController(path: string = '/') {
	return applyDecorators(
		Controller(path),
		UseGuards(FirebaseGuard),
		ApiTags(path.toUpperCase()),
	);
}
