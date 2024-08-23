import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserGroupsToPermissionsModel extends AbstractModel {
	public permissionId!: number;

	public userGroupId!: number;

	public static override get idColumn(): string {
		return "id";
	}

	public static override get tableName(): string {
		return DatabaseTableName.USER_GROUPS_TO_PERMISSIONS;
	}
}

export { UserGroupsToPermissionsModel };
