import { BaseModel } from 'src/common/bases/model.base';
import { UserRole } from '../components/userRole.enum';
import { User } from './user.schema';
import { UserGender } from '../components/userGender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../components/userStatus.enum';

export class UserModel extends BaseModel {
	@ApiProperty({ example: '60c9b0b9e0b3c2a4e0b3c2a4' })
	public uid: string;

	@ApiProperty({ example: 'USER' })
	public role: UserRole;

	@ApiProperty({ example: 'info@email.com' })
	public email: string;

	@ApiProperty({ enum: UserGender, example: UserGender.MALE })
	public gender?: UserGender;

	@ApiProperty({ example: '0123456789' })
	public phone?: string;

	@ApiProperty({ example: 'Đại học bách khoa hà nội' })
	public address?: string;

	@ApiProperty({
		example:
			'https://www.google.com.vn/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
	})
	public avatar?: string;

	@ApiProperty({ example: 'Hà Nội' })
	public city?: string;

	@ApiProperty({ example: 'Cầu Giấy' })
	public district?: string;

	@ApiProperty({ example: 'Nguyễn Văn A' })
	public fullName?: string;

	public status : UserStatus
	constructor(data: Partial<User>) {
		super(data);
		this.uid = data.uid;
		this.role = data.role;
		this.email = data.email;
		this.gender = data.gender;
		this.phone = data.phone;
		this.address = data.address;
		this.avatar = data.avatar;
		// this.city = data.city;
		// this.district = data.district;
		this.status = data.status || UserStatus.ACTIVE;
		this.fullName = data.fullName;
	}

	public static fromEntity(entity: Partial<User>) {
		return new UserModel(entity);
	}
}
