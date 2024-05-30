import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/common/repo/base.repo';
import { Model } from 'mongoose';
import { Category } from './category.schema';

export class CategoryRepo extends BaseRepo<Category> {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<Category>,
	) {
		super(categoryModel);
	}
}
