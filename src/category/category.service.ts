import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './data/category.repo';
import { StringUtil } from 'src/common/utils/string.util';
import { PageAbleDto } from 'src/common/dto/pageable.dto';

@Injectable()
export class CategorysService {
	private readonly categoryRepo: CategoryRepo;
	constructor(categoryRepo: CategoryRepo) {
		this.categoryRepo = categoryRepo;
	}

	async findAll() {
		return await this.categoryRepo.getAll();
	}

	async getPage(dto:PageAbleDto){
		const query = {}
		query['$or'] = [
			{name:StringUtil.queryLike(dto.query)}
		]
		return await this.categoryRepo.getPage(dto,query)
	}
	
	async create(name: string, image: string, slug: string) {
		return await this.categoryRepo.create({ name, image , slug});
	}

	async getbyName(name: string) {
		return await this.categoryRepo.getOne({ name: name });
	}

	async getbyId(id: string) {
		return await this.categoryRepo.getOne({
			_id: StringUtil.toObjectId(id),
		});
	}
	async count() {
		return await this.categoryRepo.count();
	}
}
