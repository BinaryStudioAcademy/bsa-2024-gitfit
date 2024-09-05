import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectApiKeyModel extends AbstractModel {
	public encodedKey!: string;

	public projectId!: number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_API_KEYS;
	}
}

export { ProjectApiKeyModel };
