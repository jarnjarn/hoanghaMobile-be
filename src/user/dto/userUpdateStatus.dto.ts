import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../components/userStatus.enum";
import { EnumUtil } from "src/common/utils/enum.util";

export class UserUpdateStatus {
	@ApiProperty({
		enum : EnumUtil.toArray(UserStatus),
		default:UserStatus.ACTIVE
	})
	status : UserStatus
}