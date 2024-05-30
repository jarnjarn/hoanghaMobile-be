import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class UploadedFileDto{
	@ApiProperty({type: 'file', format: 'binary'})
	file: Express.Multer.File
}