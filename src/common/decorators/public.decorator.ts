import { SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import { Prefix } from '../enums/prefix.enum';
export const PUBLIC_KEY = 'IS_PUBLIC';
export function Public() {
	return function (target: any, key: string, descriptor?: any) {
		Reflect.defineMetadata(PUBLIC_KEY, true, target, key);
		target[Prefix.ACCESS + key] = true;
		SetMetadata(PUBLIC_KEY, true)(target, key, descriptor);
	};
	//return SetMetadata(PUBLIC_KEY, true);
}
