import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from '../firebase/firebase.service';
import { PUBLIC_KEY } from '../decorators/public.decorator';
import { StringUtil } from '../utils/string.util';
import { UserRepo } from 'src/user/data/user.repo';
import { UsersService } from 'src/user/user.service';
import { Prefix } from '../enums/prefix.enum';
import { UserRole } from 'src/user/components/userRole.enum';
import { UserStatus } from 'src/user/components/userStatus.enum';
@Injectable()
export class FirebaseGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly userService: UsersService,
	) {}

	private readonly firebaseService = FirebaseService.gI();

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		
		const request = context.switchToHttp().getRequest();
		const token = StringUtil.extractTokenFromHeader(request);
		
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const user = await this.firebaseService.verifyIdToken(token);
			const userEntity = await this.userService.createUserIfNotExists(user.uid);
			const role = await this.userService.getRoleOrDefaul(
				user.uid,
				UserRole.USER,
			);
			if(userEntity.status == UserStatus.DELETED || userEntity.status == UserStatus.INACTIVE){
				throw new UnauthorizedException();
			}
			request[Prefix.USER] = { ...user, role: role,...userEntity };
			const roles = this.reflector.getAllAndOverride<string[]>(Prefix.ROLE, [
				context.getHandler(),
				context.getClass(),
			]);
			if (roles && !roles.includes(userEntity.role)) {
				throw new ForbiddenException();
			}
			if (isPublic) {
				return true;
			}
		} catch(e) {
			if (isPublic) {
				return true;
			}
			throw new UnauthorizedException();
		}
		return true;
	}
}
