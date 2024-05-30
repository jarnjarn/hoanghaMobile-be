import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { ProductModel } from './data/product.model';
import { Note } from 'src/common/decorators/note.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { GetBySlug } from './dto/getBySlug.dto';
import { GetProductDto } from './dto/getProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/user/components/userRole.enum';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import {  UpdateStatusProductDto } from './dto/updateProductStatus.dto';

@Controller('products')
export class ProdcutsController {
	private readonly logger = new Logger(ProdcutsController.name);

	constructor(private readonly productsService: ProductService) {}

	@Get('/')
	@Note('lấy danh sách sản phẩm')
	@Public()
	async getProducts(@Query() dto: GetProductDto) {
		return await this.productsService
			.getAllProducts(dto)
			.then((e) => e.map(ProductModel.fromEntity));
	}

	@Get('/:slug')
	@Note('lấy thông tin sản phẩm bằng slug')
	@Public()
	async getProductBySlug(@Param() dto: GetBySlug) {
		return await this.productsService
			.getBySlug(dto.slug)
			.then(ProductModel.fromEntity);
	}

	@Post('/')
	@Note('tạo mới sản phẩm')
	@Role(UserRole.ADMIN)
	async createProduct(@Body() dto:CreateProductDto) {
		return await this.productsService.create(dto).then(ProductModel.fromEntity);
	}

	@Put('status/:id')
	@Note('cập nhật status sản phẩm')
	@Role(UserRole.ADMIN)
	async deleteProduct(@Param() dto: ObjectIdDto,@Body() data:UpdateStatusProductDto) {
		return await this.productsService.updateStatus(dto.id,data.status).then(ProductModel.fromEntity)
	}

	@Put('/:id')
	@Note('cập nhật thông tin sản phẩm')
	@Role(UserRole.ADMIN)
	async updateProduct(@Param() dto: ObjectIdDto,@Body() data:CreateProductDto) {
		return await this.productsService.update(dto.id,data).then(ProductModel.fromEntity)
	}

}
