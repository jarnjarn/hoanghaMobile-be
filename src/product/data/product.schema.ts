import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema.base';
import { Option } from '../components/options';
import { DetailKeys } from '../components/detail.enum';
import { Category } from 'src/category/data/category.schema';
import { ProductModel } from './product.model';
import { ProductStatus } from '../components/productStatus.enum';
import { EnumUtil } from 'src/common/utils/enum.util';

@Schema()
export class Product extends BaseSchema {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String, required: true , default: ''})
	description?: string;

	@Prop({ type: String, required: true })
	slug: string;

	@Prop({ type: Array<String>, required: true })
	images: Array<String>;

	@Prop({ type: Array<Option>, required: true })
	options: Array<Option>;

	@Prop({ type: Map<String, String>, required: true })
	details: Map<DetailKeys, string>;

	@Prop({ type: String, required: true })
	content: string;

	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		ref: Category.name,
		autopopulate: true,
	})
	category: Category;

	@Prop({
		type: String,
		required: false,
		enum: EnumUtil.toArray(ProductStatus),
		default: ProductStatus.ACTIVE,
	})
	status?: ProductStatus;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
