
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/common/repo/base.repo';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { Category } from 'src/category/data/category.schema';
import { StringUtil } from 'src/common/utils/string.util';
import { SortEnum } from '../components/sort.enum';
import { Logger } from '@nestjs/common';
import { ProductStatus } from '../components/productStatus.enum';

export class ProductRepo extends BaseRepo<Product> {

	private readonly logger = new Logger(ProductRepo.name);

	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>,
	) {
		super(productModel);
	}

	async getProduct(
		page: number,
		limit: number,
		formPrice: number,
		toPrice: number,
		name: String,
		category?: Category,
		sort?:SortEnum
	) {
		const query = {};
		const sortQuery = {};
		if (formPrice >= 0 && toPrice >= 0) {
			// fillter price in options
			this.logger.log(`formPrice: ${StringUtil.toVnd(formPrice)}, toPrice: ${StringUtil.toVnd(toPrice)}`);

			// query by firs option of array options
			query['options.0.value'] = { $gte: formPrice, $lte: toPrice };
		}
		if (name) {
			query['name'] = StringUtil.queryLike(name);
		}
		if (category) {
			query['category'] = category._id;
		}
		query['status'] = {
			$ne: ProductStatus.DELETED,
		}
		sortQuery['createdAt'] = 1;
		if (sort && sort.length > 0) {
			switch(sort) {
				case SortEnum.TIME_ASC:
					sortQuery['createdAt'] = 1;
					break;
				case SortEnum.TIME_DESC:
					sortQuery['createdAt'] = -1;
					break;
				case SortEnum.PRICE_ASC:
					sortQuery['options.value'] = 1;
					break;
				case SortEnum.PRICE_DESC:
					sortQuery['options.value'] = -1;
					break;
			}
		}


		return await this.productModel.find(query).sort(sortQuery).skip((page - 1) * limit).limit(limit).exec();
	}
}
