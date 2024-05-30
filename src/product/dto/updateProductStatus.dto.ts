import { ApiProperty } from "@nestjs/swagger";
import { ProductStatus } from "../components/productStatus.enum";
import { EnumUtil } from "src/common/utils/enum.util";

export class UpdateStatusProductDto{

	@ApiProperty({type:ProductStatus,required:true,enum:EnumUtil.toArray(ProductStatus)})
	public status:ProductStatus
}