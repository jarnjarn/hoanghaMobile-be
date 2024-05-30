import { BaseRepo } from 'src/common/repo/base.repo';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class OrderRepo extends BaseRepo<Order> {
	constructor(
		@InjectModel(Order.name)
		private readonly orderModel: Model<Order>,
	) {
		super(orderModel);
	}
}
