import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectPermissionModel extends AbstractModel {
	public key!: string;
	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_PERMISSIONS;
	}
}

export { ProjectPermissionModel };
