import { BaseModel } from 'src/common/bases/model.base';
import { Option } from 'src/product/components/options';
import { Product } from 'src/product/data/product.schema';
import { Detail } from './detail.schema';
import { ProductModel } from 'src/product/data/product.model';
import { ApiProperty } from '@nestjs/swagger';

export class DetailModel extends BaseModel {
	@ApiProperty({ type: ProductModel })
	public product: ProductModel;
	@ApiProperty({ type: Number, example: 1 })
	public quantity: number;
	@ApiProperty({ type: Option })
	public option: Option;

	constructor(data?: Partial<Detail>) {
		super(data);
		this.product = new ProductModel(data?.product);
		this.quantity = data?.quantity;
		this.option = data?.option;
	}

	public static fromEntity(entity: Partial<Detail>) {
		// check entity is array
		return new DetailModel(entity);
	}
}
