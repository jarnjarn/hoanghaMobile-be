import { Injectable } from '@nestjs/common';
import { DetailRepo } from './data/detail.repo';
import { Detail } from './data/detail.schema';
import { Product } from 'src/product/data/product.schema';
import { Option } from 'src/product/components/options';
import { ObjectId } from 'mongoose';
import { DetailCreateDto } from './dto/detailCreate.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class DetailService {
	constructor(
		private readonly detailRepo: DetailRepo,
		private readonly productService: ProductService,
	) {}

	async create(dto: DetailCreateDto) {
		const product = await this.productService.getById(dto.product);
		const option = product.options.find((x) => x.value == dto.price);
		return await this.detailRepo.create({
			product: product,
			quantity: dto.quantity,
			option: option,
		});
	}

	async findByIds(ids: string[]) {
		return await this.detailRepo.getByIds(ids);
	}

	async deletes(ids: string[]) {
		return await this.detailRepo.deleteByIds(ids);
	}
}
