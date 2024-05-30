import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class GetBySlug {
	@Length(1, 100)
	@ApiProperty({ example: 'iphone-12-pro-max', type: String, required: true })
	slug: string;
}
