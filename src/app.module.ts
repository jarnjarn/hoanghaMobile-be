import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ProdcutsModule } from './product/product.module';
import { CategorysModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { DetailModule } from './detail/detail.module';
import { MailModule } from './mail/mail.module';
import { ImgurModule } from './imgur/imgur.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URL as string, {
			connectionFactory: (connection) => {
				connection.plugin(require('mongoose-autopopulate'));
				return connection;
			},
		}),
		UsersModule,
		ProdcutsModule,
		CategorysModule,
		OrderModule,
		DetailModule,
		MailModule,
		ImgurModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
