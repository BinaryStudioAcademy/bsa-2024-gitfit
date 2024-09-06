import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserModel extends AbstractModel {
	public deletedAt!: null | string;

	public email!: string;

	public name!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
