import { IsEnum, IsPhoneNumber, Length } from 'class-validator';
import { UserGender } from '../components/userGender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateInfoDto {
	@IsPhoneNumber('VN')
	@ApiProperty({ example: '0123456789' })
	phone: string;

	@Length(1, 255)
	@ApiProperty({ example: 'Đại học bách khoa hà nội' })
	address: string;

	// @Length(1, 255)
	// @ApiProperty({ example: 'Hà Nội' })
	// city: string;

	// @Length(1, 255)
	// @ApiProperty({ example: 'Cầu Giấy' })
	// district: string;

	@IsEnum(UserGender)
	@ApiProperty({ enum: UserGender, default: UserGender.MALE })
	gender: UserGender;

	@Length(1, 255)
	@ApiProperty({ example: 'Nguyễn Văn A' })
	fullName: string;
}
