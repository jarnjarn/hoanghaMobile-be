import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CategorysService } from './category.service';
import { CategorysController } from './category.controller';
import { CategoryRepo } from './data/category.repo';
import { Category, CategorySchema } from './data/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OldCategory } from './components/oldCategory.type';
const dataCategory = require('./components/categories.json');

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Category.name, schema: CategorySchema },
		]),
	],
	controllers: [CategorysController],
	providers: [CategorysService, CategoryRepo],
	exports: [CategorysService],
})
export class CategorysModule implements OnModuleInit {
	private readonly logger = new Logger(CategorysModule.name);
	constructor(private readonly categorysService: CategorysService) {}

	async onModuleInit() {
		if ((await this.categorysService.count()) == 0) {
			this.logger.log('No categorys found, creating ...');
			for (let index = 0; index < dataCategory.length; index++) {
				const element = dataCategory[index] as OldCategory;
				await this.categorysService.create(element.Name, element.Image, element.Slug);
			}
		}
	}
}
