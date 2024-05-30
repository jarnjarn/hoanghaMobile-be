import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from 'src/common/repo/base.repo';
import { User } from './user.schema';
import { Model } from 'mongoose';

export class UserRepo extends BaseRepo<User> {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {
		super(userModel);
	}
}
