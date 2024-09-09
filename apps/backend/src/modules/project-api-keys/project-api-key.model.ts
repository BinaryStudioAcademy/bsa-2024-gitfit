import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectApiKeyModel extends AbstractModel {
	public createdByUserId!: number;

	public encryptedKey!: string;

	public projectId!: number;

	public updatedByUserId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_API_KEYS;
	}
}

export { ProjectApiKeyModel };
