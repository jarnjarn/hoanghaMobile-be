import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/user/components/userRole.enum";
import { Prefix } from "../enums/prefix.enum";



export function Role(...roles:UserRole[]){
	return function (target: any, key: string, descriptor?: any) {
		Reflect.defineMetadata(Prefix.ROLE, roles, target, key);
		target[Prefix.ROLE + key] = roles;
		SetMetadata(Prefix.ROLE, roles)(target, key, descriptor);
	};
}