import * as admin from 'firebase-admin';
import { UserStatus } from 'src/user/components/userStatus.enum';
const service_account = require('./service_account.json');
export class FirebaseService {
	private static instance: FirebaseService;
	private app: admin.app.App;
	private constructor() {
		this.app = admin.initializeApp({
			credential: admin.credential.cert(service_account),
		});
	}
	public static gI() {
		if (!FirebaseService.instance) {
			FirebaseService.instance = new FirebaseService();
		}
		return FirebaseService.instance;
	}

	public async verifyIdToken(
		idToken: string,
	): Promise<admin.auth.DecodedIdToken> {
		return await this.app.auth().verifyIdToken(idToken);
	}

	public async getUser(uid: string): Promise<admin.auth.UserRecord> {
		return await this.app.auth().getUser(uid);
	}

	public async createUser(
		user: admin.auth.CreateRequest,
	): Promise<admin.auth.UserRecord> {
		return await this.app.auth().createUser(user);
	}

	public async deleteUser(uid: string): Promise<void> {
		return await this.app.auth().deleteUser(uid);
	}

	public async updateUser(
		uid: string,
		user: admin.auth.UpdateRequest,
	): Promise<admin.auth.UserRecord> {
		return await this.app.auth().updateUser(uid, user);
	}

	public async  updateDisplayName(uid : string, displayName : string) : Promise<admin.auth.UserRecord> {
		return await this.app.auth().updateUser(uid, {
			displayName : displayName
		})
	}


	public async updateStatusUser(uid : string, status : UserStatus) : Promise<admin.auth.UserRecord> {
		return await this.app.auth().updateUser(uid, {
			disabled : status === UserStatus.ACTIVE ? true : false
		})
	}
}
