import { Injectable } from '@nestjs/common';
import { OrderRepo } from './data/order.repo';
import { OrderCreateDto } from './dto/orderCreate.dto';
import { DetailService } from 'src/detail/detail.service';
import { DetailCreateDto } from 'src/detail/dto/detailCreate.dto';
import { StringUtil } from 'src/common/utils/string.util';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { Order } from './data/order.schema';
import { ListErrors } from 'src/common/errors/list.error';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/user/user.service';
import { UserClams } from 'src/common/guards/user.type';
import { UserGender } from 'src/user/components/userGender.enum';

@Injectable()
export class OrderService {
	constructor(
		private readonly orderRepo: OrderRepo,
		private readonly detailService: DetailService,
		private readonly mailService:MailService,
		private readonly userService:UsersService
	) {}

	async create(data: OrderCreateDto, user?:UserClams) {
		console.log(user)
		const details = [];
		await data.products.forAsync(async (x: DetailCreateDto) => {
			details.push(await this.detailService.create(x));
		});
		let order;
		if(user){
			const userEntity = await this.userService.getInfo(user.user_id)
			if(!userEntity.email){
				userEntity.email = data.email;
			}
			if(!userEntity.fullName){
				userEntity.fullName = data.fullName
			}
			if(!userEntity.phone){
				userEntity.phone = data.phone
			}
			if(!userEntity.address){
				userEntity.address = data.address;
			}
			if(!userEntity.gender){
				userEntity.gender = UserGender.MALE;
			}
			await this.userService.UpdateEntity(user.user_id,userEntity)
			order = await this.orderRepo.create({
				details: details,
				fullName: data.fullName,
				phone: data.phone,
				address: data.address,
				email: data.email,
				note: data.note,
				code: StringUtil.generateOrderCode(),
				user:userEntity
			});
		}
		else{
			order = await this.orderRepo.create({
				details: details,
				fullName: data.fullName,
				phone: data.phone,
				address: data.address,
				email: data.email,
				note: data.note,
				code: StringUtil.generateOrderCode(),
			});
		}
		if(data.email){
			this.mailService.sendMailOrder(data.email,order)
		}
		return order
	}

	async GetOrderDetail(data:Order[]) 
	{
		data.forAsync(async (x:Order) => {
			x.details = await this.detailService.findByIds(x.details.map((x) => x._id.toString()));
			console.log(await this.detailService.findByIds(x.details.map((x) => x._id.toString())));
		});
		return data;
	}

	async getAll(dto:PageAbleDto) {
		const sort = {}
		const filter = {}
		sort['createdAt'] = 1
		if(dto.query && dto.query.length > 0) {
			filter['$or'] = [
				{email:StringUtil.queryLike(dto.query)},
				{phone:StringUtil.queryLike(dto.query)},
				{fullName:StringUtil.queryLike(dto.query)},
			]
		}
		return await this.orderRepo.getPage(dto,filter,sort);
	}

	async getMyOrder(dto:PageAbleDto,user:UserClams){
		let userEntity = await this.userService.getInfo(user.user_id)
		let query = {}
		query['user'] = userEntity._id;
		let sort = {}
		sort['createdAt'] = 1;
		return this.orderRepo.getPage(dto,query,sort)
	}

	async delete(id: string) {
		const order = await this.orderRepo.getById(id).orThrow(ListErrors.ORDER_NOT_FOUND);
		await this.detailService.deletes(order.details.map((x) => x._id.toString()));
		return await this.orderRepo.deleteById(id);
	}
}
