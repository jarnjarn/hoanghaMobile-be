import { Injectable, Logger } from '@nestjs/common';
import { ProductRepo } from './data/product.repo';
import { Product } from './data/product.schema';
import { DetailKeys } from './components/detail.enum';
import { StringUtil } from 'src/common/utils/string.util';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { CategorysService } from 'src/category/category.service';
import { GetProductDto } from './dto/getProduct.dto';
import { ListErrors } from 'src/common/errors/list.error';
import { FileUtil } from 'src/common/utils/file.util';
import * as fs from 'fs';
import xlsx from 'node-xlsx';
import { join } from 'path';
import { Option } from './components/options';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductStatus } from './components/productStatus.enum';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
	private readonly _productRepo: ProductRepo;
	private readonly logger = new Logger(ProductService.name);
	private readonly categoryService: CategorysService;
	constructor(productRepo: ProductRepo, categoryService: CategorysService) {
		this._productRepo = productRepo;
		this.categoryService = categoryService;
	}

	async addDefaultProducts() {
		var product = new Product();
		product.name = 'iPhone 12 Pro Max';
		product.description = 'iPhone 12 Pro Max';
		product.slug = 'iphone-12-pro-max' + StringUtil.generateRandomString(5);
		product.images = [
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/1/_/1_252.jpg',
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/5/_/5_157.jpg',
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/4/_/4_186.jpg',
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/6/_/6_129.jpg',
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/3/_/3_224.jpg',
			'https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/2/_/2_241.jpg',
		];
		product.options = [
			{ name: '64GB', value: 3000000 },
			{ name: '128GB', value: 300000000 },
		];
		product.details = new Map<DetailKeys, string>();
		product.details.set(
			DetailKeys.SCREEN_TECHNOLOGY,
			'IPS LCD, 6.1, Liquid Retina HD',
		);
		product.details.set(DetailKeys.SCREEN_SIZE, '6.1 inch');
		product.details.set(
			DetailKeys.SCREEN_RESOLUTION,
			'HD+ (828 x 1792 Pixels)',
		);
		product.details.set(DetailKeys.SCREEN_REFRESH_RATE, '60 Hz');
		product.details.set(DetailKeys.CAMERA_RESOLUTION, '12 MP');
		product.details.set(DetailKeys.OS_SYSTEM, 'iOS 14');
		product.details.set(DetailKeys.CPU, 'Apple A14 Bionic 6 nhân');
		product.details.set(DetailKeys.ROM, '64 GB');
		product.details.set(DetailKeys.RAM, '4 GB');
		product.details.set(DetailKeys.MOBILE_NETWORK, '3G, 4G LTE Cat 16');
		product.details.set(DetailKeys.SIM, '1 Nano SIM & 1 eSIM, Hỗ trợ 5G');
		product.details.set(
			DetailKeys.CONNECTIVITY,
			'Wi-Fi, Bluetooth v5.0, OTG, NFC',
		);
		product.details.set(
			DetailKeys.BATTERY_CAPACITY,
			'2815 mAh, có sạc nhanh',
		);
		product.content = fs.readFileSync(
			join(__dirname, 'components','productContent.html'),
			'utf8',
		);
		product.category = await this.categoryService.getbyName('Apple');
		await this._productRepo.create(product);
	}

	async addProductFromExcel() {
		const workSheetsFromBuffer = xlsx.parse(join(__dirname, 'components','dataExample.xlsx'));
		const content = fs.readFileSync(
			join(__dirname, 'components','productContent.html'),
			'utf8',
		);
		workSheetsFromBuffer[0].data.forAsync<Array<String>>(async (element) => {
			let entity = element as Array<string>;
			entity = entity.map((element) => { return element.trim() });
			if (entity.length > 0 && entity[0].toString().trim() != 'Tên sản phẩm') {
				var product = new Product();
				product.name = entity[0];
				product.slug = entity[1] + StringUtil.generateRandomString(5);
				product.description = entity[0];
				product.images = entity[2].split('\n');
				product.options = new Array<Option>();
				entity[3].split('\n').forEach((element) => {
					var option = new Option();
					option.name = element.split('|')[0]; 
					option.value = StringUtil.getNumberFromString(element.split('|')[1]);
					product.options.push(option);
				});
				product.options = product.options.sort((a, b) => {
					return (a as any).value - (b as any).value;
				});
				product.details = new Map<DetailKeys, string>();
				product.details.set(
					DetailKeys.SCREEN_TECHNOLOGY,
					entity[4],
				);
				product.details.set(DetailKeys.SCREEN_SIZE, entity[5]);
				product.details.set(
					DetailKeys.SCREEN_RESOLUTION,
					entity[6],
				);
				product.details.set(DetailKeys.SCREEN_REFRESH_RATE, entity[7]);
				product.details.set(DetailKeys.CAMERA_RESOLUTION, entity[8]);
				product.details.set(DetailKeys.OS_SYSTEM, entity[9]);
				product.details.set(DetailKeys.CPU, entity[10]);
				product.details.set(DetailKeys.ROM, entity[11]);
				product.details.set(DetailKeys.RAM, entity[12]);
				product.details.set(DetailKeys.MOBILE_NETWORK, entity[13]);
				product.details.set(DetailKeys.SIM, entity[14]);
				product.details.set(
					DetailKeys.BATTERY_CAPACITY,
					entity[15],
				);
				product.content = fs.readFileSync(
					join(__dirname, 'components','productContent.html'),
					'utf8',
				);
				product.category = await this.categoryService.getbyName(
					entity[16],
				);
				product.content = content;
				await this._productRepo.create(product);
			}
		});

	}



	async getBySlug(slug: string) {
		return await this._productRepo.getOne({ slug: slug });
	}

	async getCount() {
		return await this._productRepo.count();
	}

	async getAllProducts(dto: GetProductDto) {
		let category = null;
		if (dto.category) {
			category = await this.categoryService
				.getbyId(dto.category)
				.orThrow(ListErrors.CATEGORY_NOT_FOUND);
		}
		return await this._productRepo.getProduct(
			dto.page,
			dto.limit,
			dto.formPrice,
			dto.toPrice,
			dto.query,
			category,
			dto.sort,
		);
	}

	async getById(id: string) {
		return await this._productRepo
			.getById(id)
			.orThrow(ListErrors.PRODUCT_NOT_FOUND);
	}

	async create(dto: CreateProductDto) {
		const product = new Product();
		product.name = dto.name;
		product.slug = dto.slug;
		product.description = dto.name;
		product.images = dto.images;
		product.options = dto.options;
		product.details = dto.details;
		product.content = dto.content;
		product.category = await this.categoryService.getbyId(dto.category);
		return await this._productRepo.create(product);
	}

	async update(id: string, dto: UpdateProductDto) 
	{
		const product = await this._productRepo.getById(id).orThrow(ListErrors.PRODUCT_NOT_FOUND);
		product.name = dto.name;
		product.slug = dto.slug;
		product.description = dto.name;
		product.images = dto.images;
		product.options = dto.options;
		product.details = dto.details;
		product.content = dto.content;
		product.category = await this.categoryService.getbyId(dto.category);
		return await this._productRepo.updateById(id, product);
	}

	async updateStatus(id: string, status: ProductStatus) {
		const product = await this._productRepo
			.getById(id)
			.orThrow(ListErrors.PRODUCT_NOT_FOUND);
		product.status = status;
		return await this._productRepo.updateById(id, product);
	}
}
