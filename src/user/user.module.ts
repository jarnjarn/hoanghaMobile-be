import { Global, Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UserRepo } from './data/user.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './data/user.schema';
import { MailModule } from 'src/mail/mail.module';
import { ImgurModule } from 'src/imgur/imgur.module';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MailModule,
		ImgurModule
	],
	controllers: [UsersController],
	providers: [UsersService, UserRepo],
	exports: [UsersService],
})
export class UsersModule {}
