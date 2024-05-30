import { BaseModel } from 'src/common/bases/model.base';
import { DetailKeys } from '../components/detail.enum';
import { Option } from '../components/options';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.schema';
import { Category } from 'src/category/data/category.schema';
import { CategoryModel } from 'src/category/data/category.model';

export class ProductModel extends BaseModel {
	@ApiProperty({ example: 'iPhone 12 Pro Max', type: String, required: true })
	public name: string;

	@ApiProperty({ example: 'iPhone 12 Pro Max', type: String, required: true })
	public description: string;

	@ApiProperty({ example: 'iphone-12-pro-max', type: String, required: true })
	public slug: string;

	@ApiProperty({
		example: [
			'https://cdn.tgdd.vn/Products/Images/42/228738/iphone-12-pro-max-xanh-duong-new-600x600-200x200.jpg',
		],
		type: Array<String>,
		required: true,
	})
	public images: Array<String>;

	@ApiProperty({ example: 30000000, type: Number, required: true })
	public price: number;

	@ApiProperty({
		example: [
			{ name: '64GB', value: 3000000 },
			{ name: '128GB', value: 300000000 },
		],
		type: Array<Option>,
		required: true,
	})
	public options: Array<Option>;

	@ApiProperty({
		example: { RAM: '4GB', ROM: '64GB', CPU: 'APPLE A15 6 nhân 8 luồng' },
		type: Map<String, String>,
		required: true,
	})
	public details: Map<DetailKeys, string>;

	@ApiProperty({
		example: `<div>iPhone 12 Pro Max<div> `,
	})
	public content: string;

	public category: CategoryModel;

	constructor(model?: Partial<Product>) {
		super(model);
		this.name = model?.name;
		this.description = model?.description;
		this.slug = model?.slug;
		this.images = model?.images;
		this.options = model?.options;
		this.details = model?.details;
		this.content = model?.content;
		this.category = new CategoryModel(model?.category);
	}

	public static fromEntity(entity: Partial<Product>) {
		return new ProductModel(entity);
	}
}
