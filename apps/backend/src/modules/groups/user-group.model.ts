import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserGroupModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.USER_GROUPS;
	}
}

export { UserGroupModel };
