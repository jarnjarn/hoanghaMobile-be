import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImgurService } from './imgur.service';
import { StringUtil } from 'src/common/utils/string.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { UploadedFileDto } from './dto/uploadfile.dto';
import { ApiConsumes, ApiProduces } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { memoryStorage } from 'multer';
import { FileTestInterceptor } from 'src/file/file.interceptor';
import { UploadFileMemory } from 'src/common/decorators/uploadFileMemory.decorator';
import { ImgurModel } from './data/imgur.model';

@ApiController('imgur')
export class ImgurController {
	constructor(private readonly imgurService:ImgurService) {}

	@Post('upload_image')
	@UploadFileMemory('file')
	@Public()
	async uploadImageBase64(@Body() dto: UploadedFileDto) {
		return await this.imgurService.uploadImageBase64(StringUtil.covertToBase64(dto.file)).then(ImgurModel.formEntity);
	}
}
