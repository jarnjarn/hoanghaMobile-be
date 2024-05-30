import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { DetailCreateDto } from 'src/detail/dto/detailCreate.dto';

export class OrderCreateDto {
	@ValidateNested({ each: true })
	@Type(() => DetailCreateDto)
	@ApiProperty({ type: () => [DetailCreateDto] })
	products: DetailCreateDto[];

	@IsString()
	@Type(() => String)
	@Length(1, 255)
	@ApiProperty({ type: String, example: 'Nguyen Van A' })
	fullName: string;

	@IsString()
	@Type(() => String)
	@Length(1, 255)
	@ApiProperty({ type: String, example: '0123456789' })
	phone: string;

	@IsString()
	@Type(() => String)
	@Length(1, 255)
	@ApiProperty({ type: String, example: 'Ha Noi' })
	address: string;

	@IsString()
	@IsOptional()
	@Type(() => String)
	@ApiProperty({ type: String, example: 'user@info.com' })
	email: string;

	@IsString()
	@IsOptional()
	@Type(() => String)
	@ApiProperty({ type: String, example: 'note' })
	note: string;
}
