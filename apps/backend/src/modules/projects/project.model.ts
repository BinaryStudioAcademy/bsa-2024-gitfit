import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectModel extends AbstractModel {
	public analyticsLastSyncedAt!: string;

	public analyticsLastSyncedByUser!: string;

	public description!: string;

	public lastActivityDate!: string;

	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.PROJECTS;
	}
}

export { ProjectModel };
