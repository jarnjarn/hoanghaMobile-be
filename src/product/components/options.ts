import { ApiProperty } from '@nestjs/swagger';

export class Option {
	@ApiProperty({ type: String, example: '60GB' })
	name: string;
	@ApiProperty({ type: Number, example: 100000 })
	value: Number;
}
