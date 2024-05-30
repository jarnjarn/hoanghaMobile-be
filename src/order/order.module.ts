import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './data/order.schema';
import { OrderRepo } from './data/order.repo';
import { DetailModule } from 'src/detail/detail.module';
import { UsersModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
		DetailModule,
		UsersModule,
		MailModule
	],
	controllers: [OrderController],
	providers: [OrderService, OrderRepo],
})
export class OrderModule {}
