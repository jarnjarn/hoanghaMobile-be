import { BaseModel } from 'src/common/bases/model.base';
import { DetailModel } from 'src/detail/data/detail.model';
import { Order } from './order.schema';
import { ApiProperty } from '@nestjs/swagger';

export class OrderModel extends BaseModel {
	@ApiProperty({ type: String, example: 'Nguyễn Văn A' })
	public fullName: string;
	@ApiProperty({ type: String, example: '0123456789' })
	public phone: string;
	@ApiProperty({ type: String, example: 'Hà Nội' })
	public address: string;
	@ApiProperty({ type: String, example: 'user@info.com' })
	public email?: string;
	@ApiProperty({ type: String, example: 'Giao hàng nhanh' })
	public note?: string;
	@ApiProperty({ type: [DetailModel] })
	public details: Array<DetailModel>;
	@ApiProperty({ type: String, example: 'CZP6FL' })
	public code: string;
	constructor(data?: Partial<Order>) {
		super(data);
		this.fullName = data?.fullName;
		this.phone = data?.phone;
		this.address = data?.address;
		this.email = data?.email;
		this.note = data?.note;
		this.code = data?.code;
		this.details = Array.from(data?.details || []).map(
			(x) => new DetailModel(x),
		);
	}

	public static fromEntity(entity: Partial<Order>) {
		// check entity is array
		return new OrderModel(entity);
	}
}
