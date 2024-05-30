import { Controller, Get, Query } from '@nestjs/common';
import { CategorysService } from './category.service';
import { Note } from 'src/common/decorators/note.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CategoryModel } from './data/category.model';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

@Controller('categorys')
export class CategorysController {
	constructor(private readonly categorysService: CategorysService) {}

	@Get('/')
	@Note('Get all categorys')
	@Public()
	async getAll(): Promise<CategoryModel[]> {
		return await this.categorysService
			.findAll()
			.then((e) => e.map(CategoryModel.fromEntity));
	}

	@Get('/page')
	@Note('Get all categorys')
	@Public()
	async getpage(@Query() dto:PageAbleDto): Promise<CategoryModel[]> {
		return await this.categorysService
			.getPage(dto)
			.then((e) => e.map(CategoryModel.fromEntity));
	}
}
