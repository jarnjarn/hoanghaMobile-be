import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImgurClient } from 'imgur';
@Injectable()
export class ImgurService {
	private readonly imgurClient: ImgurClient;
	private readonly configService = new ConfigService();
	constructor() {
		this.imgurClient = new ImgurClient({
			clientId: this.configService.get<string>('IMGUR_CLIENT_ID'),
			clientSecret: this.configService.get<string>('IMGUR_CLIENT_SECRET'),
		});
	}

	async uploadImageBase64(base64: string) {
		return await this.imgurClient.upload({
			image: base64,
			type: 'base64',
		})
	}
}
