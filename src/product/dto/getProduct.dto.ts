import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { SortEnum } from '../components/sort.enum';

export class GetProductDto extends PartialType(PageAbleDto) {
	@IsNumber()
	@Type(() => Number)
	@IsOptional()
	formPrice: number = 0;

	@IsNumber()
	@Type(() => Number)
	@IsOptional()
	toPrice: number = 999999999;

	@IsMongoId()
	@Type(() => String)
	@IsOptional()
	category?: string;

	@IsString()
	@Type(() => String)
	@IsOptional()
	sort?: SortEnum;
}
