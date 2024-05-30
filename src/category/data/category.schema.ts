import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema.base';

@Schema()
export class Category extends BaseSchema {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String, required: true })
	image: string;

	@Prop({ type: String, required: true })
	slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
