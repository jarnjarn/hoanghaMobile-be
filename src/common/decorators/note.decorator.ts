import { Prefix } from '../enums/prefix.enum';
import {
	applyDecorators,
	ClassSerializerInterceptor,
	Controller,
	ForbiddenException,
	HttpException,
	UnauthorizedException,
	UseInterceptors,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiConsumes,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger';
import 'reflect-metadata';
import { UserRole } from 'src/user/components/userRole.enum';
export function Note(title: string, is_Puclic?: boolean) {
	return function (target: any, prototypeKey: string, descriptor?: any) {
		var arr = [];
		const isPublic = target[Prefix.ACCESS + prototypeKey];
		if (!is_Puclic && !isPublic) {
			//title = "Public Api : " + title;
			arr.push(ApiBearerAuth());
		} else {
			arr.push(ApiTags('Public API'));
		}

		var role = target[Prefix.ROLE + prototypeKey]
		if(role){
			let roles = role as Array<UserRole>
			title +="  => " + roles.join(',')
		}


		arr.push(ApiOperation({ summary: title }));
		var entity = target[Prefix.ENTITY + prototypeKey];
		var isArray = target[Prefix.ENTITY_IS_ARRAY + prototypeKey];
		if (entity) {
			arr.push(
				ApiResponse({
					status: 200,
					description: 'OK',
					type: entity,
					isArray: isArray ? true : false,
				}),
			);
			arr.push(ApiResponse({ status: 400, description: 'Bad Request' }));
			arr.push(ApiResponse({ status: 401, description: 'Unauthorized' }));
			arr.push(ApiResponse({ status: 403, description: 'Forbidden' }));
			arr.push(ApiResponse({ status: 404, description: 'Not Found' }));
			arr.push(
				ApiResponse({
					status: 500,
					description: 'Internal Server Error',
				}),
			);
		}
		return applyDecorators(...arr)(target, prototypeKey, descriptor);
	};
}
