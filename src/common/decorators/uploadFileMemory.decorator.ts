import { UseInterceptors, applyDecorators } from "@nestjs/common";


import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { memoryStorage } from "multer";
import { Observable } from 'rxjs';

@Injectable()
export class FileTestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
	if(context.switchToHttp().getRequest().file){
		var file = context.switchToHttp().getRequest().file as Express.Multer.File;
		context.switchToHttp().getRequest().body[file.fieldname] = file; 
	}
	if(context.switchToHttp().getRequest().files){
		var files = context.switchToHttp().getRequest().files as Express.Multer.File[];
		files.forEach(file => {
			context.switchToHttp().getRequest().body[file.fieldname] = file;
		});
	}
    return next.handle();
  }
}


export function UploadFileMemory(field:string) {
	return applyDecorators(
		ApiConsumes('multipart/form-data'),
		UseInterceptors(FileInterceptor(field,{storage:memoryStorage()})),
		UseInterceptors(new FileTestInterceptor),
	);
}