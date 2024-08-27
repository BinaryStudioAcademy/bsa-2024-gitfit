import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class PermissionModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.PERMISSIONS;
	}
}

export { PermissionModel };
