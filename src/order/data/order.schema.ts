import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/bases/schema.base';
import { Detail } from 'src/detail/data/detail.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/data/user.schema';

@Schema({
	timestamps:true
})
export class Order extends BaseSchema {
	@Prop({ type: String, required: true })
	fullName: string;

	@Prop({ type: String, required: true })
	phone: string;

	@Prop({ type: String, required: true })
	address: string;

	@Prop({ type: String, required: false })
	email?: string;

	@Prop({ type: String, required: false })
	note?: string;

	@Prop({ type: String, required: true })
	code: string;

	@Prop({
		type: [mongoose.Types.ObjectId],
		required: true,
		ref: Detail.name,
		autopopulate: true,
	})
	details: Array<Detail>;

	@Prop({
		type: mongoose.Types.ObjectId,
		required: false,
		ref: User.name,
		autopopulate: true,
	})
	user? : User
}

export const OrderSchema = SchemaFactory.createForClass(Order);
