import { Global, Module } from '@nestjs/common';
import { DetailService } from './detail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Detail, DetailSchema } from './data/detail.schema';
import { DetailRepo } from './data/detail.repo';
import { ProductModel } from 'src/product/data/product.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Detail.name, schema: DetailSchema },
		]),
		ProductModel,
	],
	controllers: [],
	providers: [DetailService, DetailRepo],
	exports: [DetailService],
})
export class DetailModule {}
