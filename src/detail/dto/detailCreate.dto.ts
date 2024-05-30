import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, Min, IsMongoId, isNumber } from 'class-validator';

export class DetailCreateDto {
	@IsMongoId()
	@ApiProperty({ type: String, example: 'product id' })
	product: string;

	@IsNumber()
	@Type(() => Number)
	@Min(1)
	@ApiProperty({ type: Number, example: 1 })
	quantity: number;

	@IsNumber()
	@Type(() => Number)
	@Min(1)
	@ApiProperty({ type: Number, example: 100000 })
	price: number;
}
