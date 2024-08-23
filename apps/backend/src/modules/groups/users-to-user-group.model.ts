import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UsersToUserGroupModel extends AbstractModel {
	public userGroupId!: number;

	public userId!: number;

	public static override get idColumn(): string {
		return "id";
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS_TO_USER_GROUPS;
	}
}

export { UsersToUserGroupModel };
