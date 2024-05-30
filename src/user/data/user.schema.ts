import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/bases/schema.base';
import { UserRole } from '../components/userRole.enum';
import { UserGender } from '../components/userGender.enum';
import { UserStatus } from '../components/userStatus.enum';
import { EnumUtil } from 'src/common/utils/enum.util';

@Schema({
	timestamps: true,
})
export class User extends BaseSchema {
	@Prop({ type: String, required: true })
	uid: string;

	@Prop({ type: String, required: true })
	email: string;

	@Prop({ type: String, required: false })
	fullName?: string;

	@Prop({ type: String, required: true, default: UserRole.USER })
	role?: UserRole;

	@Prop({ type: String, required: false, default: UserGender.MALE })
	gender?: UserGender;

	@Prop({ type: String, required: false })
	phone?: string;

	@Prop({ type: String, required: false })
	address?: string;

	@Prop({ type: String, required: false })
	avatar?: string;

	@Prop({ type: String, required: false , default: UserStatus.ACTIVE , enum: EnumUtil.toArray(UserStatus) })
	status?: UserStatus;

	// @Prop({ type: String, required: false })
	// city?: string;

	// @Prop({ type: String, required: false })
	// district?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
