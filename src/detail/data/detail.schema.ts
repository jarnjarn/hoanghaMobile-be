import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema.base';
import { Product } from 'src/product/data/product.schema';
import { Option } from 'src/product/components/options';
import * as mongoose from 'mongoose';

@Schema()
export class Detail extends BaseSchema {
	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		ref: Product.name,
		autopopulate: true,
	})
	product: Product;

	@Prop({ type: Number, required: true })
	quantity: number;

	@Prop({ type: Object, required: true })
	option: Option;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
