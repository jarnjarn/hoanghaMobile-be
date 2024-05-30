import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { Note } from 'src/common/decorators/note.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { OrderCreateDto } from './dto/orderCreate.dto';
import { OrderModel } from './data/order.model';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/user/components/userRole.enum';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { CurrUser } from 'src/common/decorators/user.decorator';
import { UserClams } from 'src/common/guards/user.type';

@ApiController('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@Note('Create order')
	@Public()
	async create(@Body() dto: OrderCreateDto , @CurrUser() user:UserClams) {
		return await this.orderService.create(dto,user).then(OrderModel.fromEntity);
	}

	@Get()
	@Note('Get all order')
	@Role(UserRole.ADMIN)
	async getAll(@Query() dto:PageAbleDto) {
		return await this.orderService.getAll(dto).then((e) => e.map(OrderModel.fromEntity));
	}

	@Delete("/:id")
	@Note('Delete order')
	@Role(UserRole.ADMIN)
	async delete(@Param() dto:ObjectIdDto) {
		return await this.orderService.delete(dto.id).then(OrderModel.fromEntity);
	}

	@Get("my")
	@Note('Get my Order')
	async getMyOrder(@Query() dto:PageAbleDto, @CurrUser() user:UserClams){
		return this.orderService.getMyOrder(dto,user).then(e => e.map(OrderModel.fromEntity))
	}
	
}
