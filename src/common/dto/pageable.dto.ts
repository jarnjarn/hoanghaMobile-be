import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PageAbleDto {
	@Type(() => Number)
	@ApiProperty({ default: 1 })
	page: number = 1;

	@Type(() => Number)
	@ApiProperty({ default: 10 })
	limit: number = 10;

	@Type(() => String)
	@ApiProperty({ default: '' })
	@IsOptional()
	query?: string = '';
}
