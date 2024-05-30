import { BaseRepo } from 'src/common/repo/base.repo';
import { Detail } from './detail.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class DetailRepo extends BaseRepo<Detail> {
	constructor(
		@InjectModel(Detail.name)
		private readonly detailModel: Model<Detail>,
	) {
		super(detailModel);
	}
}
