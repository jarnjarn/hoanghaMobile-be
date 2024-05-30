import { Injectable, Logger } from '@nestjs/common';
import { UserRepo } from './data/user.repo';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { UserUpdateInfoDto } from './dto/userUpdateInfo.dto';
import { ListErrors } from 'src/common/errors/list.error';
import { UserRole } from './components/userRole.enum';
import { MailService } from 'src/mail/mail.service';
import { PageAbleDto } from 'src/common/dto/pageable.dto';
import { StringUtil } from 'src/common/utils/string.util';
import { UserStatus } from './components/userStatus.enum';
import { ImgurService } from 'src/imgur/imgur.service';
import { User } from './data/user.schema';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);


	private readonly _firebaseService = FirebaseService.gI();
	constructor(
		private readonly _userRepo: UserRepo,
		private readonly _mailService : MailService,
		private readonly _imgurService : ImgurService
		) {

	}

	async testSendMail() {
		await this._mailService.sendMailWelcome("chautuan190@gmail.com",'chau tuan')
	}

	async createUserIfNotExists(uid: string) {
		const user = await this._userRepo.getOne({ uid: uid });
		if (!user) {
			var userFirebase = await this._firebaseService.getUser(uid);
			return await this._userRepo.create({
				uid: uid,
				email: userFirebase.email,
			});
		}
		return user;
	}

	async UpdateInfo(uid: string, data: UserUpdateInfoDto) {
		const user = await this._userRepo
			.getOne({ uid: uid })
			.orThrow(ListErrors.USER_NOT_FOUND);
		await this._userRepo.update(user._id, data);
		var res = await this._firebaseService.updateDisplayName(uid, data.fullName);
		this.logger.log(JSON.stringify(res));
		return await this._userRepo.getOne({ uid: uid });
	}

	async UpdateEntity(uid,data:User){
		return await this._userRepo.update({ uid:uid},data)
	}

	async getRole(uid: string) {
		const user = await this._userRepo
			.getOne({ uid: uid })
			.orThrow(ListErrors.USER_NOT_FOUND);
		return user.role;
	}

	async getRoleOrDefaul(uid: string, defaultRole: UserRole) {
		return await this._userRepo
			.getOne({ uid: uid })
			.orElse({ role: defaultRole });
	}

	async getInfo(uid: string) {
		return await this._userRepo
			.getOne({ uid: uid })
			.orThrow(ListErrors.USER_NOT_FOUND);
	}

	async getAllUsers(dto:PageAbleDto) {
		const query = {};
		if(dto.query){
			query['$or'] = [
				{email:StringUtil.queryLike(dto.query)},
				{phone:StringUtil.queryLike(dto.query)},
				{fullName:StringUtil.queryLike(dto.query)},
			]
		}
		query['status'] = {
			$ne:UserStatus.DELETED
		}
		return await this._userRepo.getPage(dto,query);
	}

	async updateUserInfo(id: string, data: UserUpdateInfoDto) 
	{
		const user = await this._userRepo.updateById(id, data).orThrow(ListErrors.USER_NOT_FOUND);
		return await this.updateUserInfo(user.uid,data);
	}

	async updateRole(id: string, role: UserRole) {
		await this._userRepo.updateById(id, { role: role }).orThrow(ListErrors.USER_NOT_FOUND);
	}

	async updateStatus(id: string, status: UserStatus) {
		const user = await this._userRepo.getById(id).orThrow(ListErrors.USER_NOT_FOUND);
		await this._firebaseService.updateStatusUser(user.uid,status)
		await this._userRepo.updateById(id, { status: status })
		return await this.getInfo(user.uid);
	}
	async updateAvatar(uid: string, File: Express.Multer.File) {
		const user = await this._userRepo.getOne({ uid:uid }).orThrow(ListErrors.USER_NOT_FOUND);
		const res = await this._imgurService.uploadImageBase64(StringUtil.covertToBase64(File));
		await this._userRepo.update({ uid: uid }, { avatar: res.data.link })
		return await this.getInfo(user.uid);
	}
}
