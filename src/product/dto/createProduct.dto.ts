import { ApiProperty } from "@nestjs/swagger";
import { DetailKeys } from "../components/detail.enum";
import { Option } from "../components/options";
import { Length } from "class-validator";
export class CreateProductDto
{

	@ApiProperty({ type: String, required: true })
	@Length(5, 100)
	name: string;

	@ApiProperty({ type: String, required: true })
	@Length(5, 100)
	slug: string;

	@ApiProperty({ type: Array<String>, required: true })
	images: Array<String>;

	@ApiProperty({ type: Array<Option>, required: true })
	options: Array<Option>;

	@ApiProperty({ type: Map<String, String>, required: true })
	details: Map<DetailKeys, string>;

	@ApiProperty({ type: String, required: true })
	@Length(5)
	content: string;

	@ApiProperty({ type: String, required: true })
	@Length(5, 100)
	category: string;
}