import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
@Module({
  imports: [
	MailerModule.forRoot({
		// transport: 'smtps://user@example.com:topsecret@smtp.example.com',
		// or
		transport: {
		  host: 'sandbox.smtp.mailtrap.io',
		  port: 2525,
		  secure: false,
		  auth: {
			user: 'f40c942c6edcb7',
			pass: 'd511d3a21ae6a3',
		  },
		},
		defaults: {
		  from: '"No Reply" <noreply@example.com>',
		},
		template: {
		  dir: join(__dirname, 'templates'),
		  adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
		  options: {
			strict: true,
		  },
		},
	  }),
	],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
