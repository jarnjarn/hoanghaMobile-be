import { Controller, Logger, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiController } from 'src/common/decorators/apiController.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Note } from 'src/common/decorators/note.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import province from './components/province';
import { CurrUser } from 'src/common/decorators/user.decorator';
import { UserClams } from 'src/common/guards/user.type';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { UserModel } from './data/user.model';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { UploadFileMemory } from 'src/common/decorators/uploadFileMemory.decorator';
import { UploadedFileDto } from 'src/imgur/dto/uploadfile.dto';
import { ObjectIdDto } from 'src/common/dto/objectId.dto';
import { UserStatus } from './components/userStatus.enum';
import { UserRole } from './components/userRole.enum';
import { Role } from 'src/common/decorators/role.decorator';
import { UserUpdateStatus } from './dto/userUpdateStatus.dto';
@ApiController('users')
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private readonly usersService: UsersService) {}

	@Get('sendmail')
	@Note('test send mail')
	@Public()
	async sendmail() {
		return await this.usersService.testSendMail();
	}

	@Get('/info')
	@Note('Lấy thông tin user')
	async getInfo(@CurrUser() user: UserClams) {
		return await this.usersService
			.getInfo(user.user_id)
			.then(UserModel.fromEntity);
	}

	@Put('/info')
	@Note('Cập nhật thông tin user')
	async updateInfo(
		@CurrUser() user: UserClams,
		@Body() data: UserUpdateInfoDto,
	) {
		return await this.usersService
			.UpdateInfo(user.user_id, data)
			.then(UserModel.fromEntity);
	}

	@Get('/')
	@Note('Lấy danh sách user')
	async getUsers(@Query() dto:PageAbleDto) {
		return await this.usersService.getAllUsers(dto).then((e) => e.map(UserModel.fromEntity));
	}

	@Post('avatar')
	@UploadFileMemory('file')
	@Note('cập nhật avatar')
	async uploadImageBase64(@Body() dto: UploadedFileDto,@CurrUser() user: UserClams) {
		return await this.usersService.updateAvatar(user.user_id,dto.file).then(UserModel.fromEntity);
	}

	@Put('status/:id')
	@Note('Cập nhật trạng thái user')
	@Role(UserRole.ADMIN)
	async updateStatus(@Param() dto:ObjectIdDto,@Body() data:UserUpdateStatus) {
		return await this.usersService.updateStatus(dto.id,data.status).then(UserModel.fromEntity);
	}

	@Put('userInfo/:id')
	@Note('Cập nhật thông tin user')
	@Role(UserRole.ADMIN)
	async updateUserInfo(@Param() dto:ObjectIdDto,@Body() data:UserUpdateInfoDto) {
		return await this.usersService.updateUserInfo(dto.id,data).then(UserModel.fromEntity);
	}
}
