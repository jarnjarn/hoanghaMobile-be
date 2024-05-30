import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProdcutsController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './data/product.schema';
import { ProductRepo } from './data/product.repo';
import { CategorysModule } from 'src/category/category.module';
import { CategorysService } from 'src/category/category.service';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
		]),
		CategorysModule,
	],
	controllers: [ProdcutsController],
	providers: [ProductService, ProductRepo],
	exports: [ProductService],
})
export class ProdcutsModule implements OnModuleInit {
	private readonly logger = new Logger(ProdcutsModule.name);

	constructor(
		private readonly productService: ProductService,
		private readonly categoryService: CategorysService,
	) {}
	async onModuleInit() {
		
		if (
			(await this.productService.getCount()) == 0 &&
			(await this.categoryService.count()) > 0
		) {
			this.logger.log('No products found, adding default products');
			await this.productService.addProductFromExcel();
		}
	}
} 
