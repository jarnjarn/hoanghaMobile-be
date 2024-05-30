import { BaseModel } from 'src/common/bases/model.base';
import { Category } from './category.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryModel extends BaseModel {
	@ApiProperty({ type: String, example: 'category name' })
	public name: string;

	@ApiProperty({ type: String, example: 'category image' })
	public image: string;

	@ApiProperty({ type: String, example: 'category slug' })
	public slug: string;

	constructor(entity: Partial<Category>) {
		super(entity);
		this.name = entity?.name;
		this.image = entity?.image;
		this.slug = entity?.slug;
	}

	public static fromEntity(entity: Partial<Category>) {
		// check entity is array
		return new CategoryModel(entity);
	}
}
