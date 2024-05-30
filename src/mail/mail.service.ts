import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/data/order.schema';

@Injectable()
export class MailService 
{
	constructor(private readonly mailerService: MailerService) {}

	private async sendMail(to: string, subject: string, template: string, context: object) {
		return await this.mailerService.sendMail({
			to,
			subject,
			template,
			context,
		});
	}

	async sendMailWelcome(to: string, name: string) {
		return await this.sendMail(
			to,
			'Welcome to shop',
			'./welcome',
			{
				name,
			}, 
		);
	}

	async sendMailOrder(to: string,  order: Order) {
		return await this.sendMail(
			to,
			'Cảm ơn bạn đã đặt hàng',
			'./order',
			{
				order,
			}, 
		);
	}
}

