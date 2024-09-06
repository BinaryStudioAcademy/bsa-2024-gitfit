import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectApiKeyModel extends AbstractModel {
	public createdBy!: number;

	public encryptedKey!: string;

	public projectId!: number;

	public updatedBy!: number;

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_API_KEYS;
	}
}

export { ProjectApiKeyModel };
