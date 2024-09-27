import { type Repository } from "~/libs/types/types.js";

import { ProjectApiKeyEntity } from "./project-api-key.entity.js";
import { type ProjectApiKeyModel } from "./project-api-key.model.js";

class ProjectApiKeyRepository implements Repository {
	private projectApiKeyModel: typeof ProjectApiKeyModel;

	public constructor(projectApiKeyModel: typeof ProjectApiKeyModel) {
		this.projectApiKeyModel = projectApiKeyModel;
	}

	public async create(
		entity: ProjectApiKeyEntity,
	): Promise<ProjectApiKeyEntity> {
		const { createdByUserId, encryptedKey, projectId, updatedByUserId } =
			entity.toNewObject();

		const projectApiKey = await this.projectApiKeyModel
			.query()
			.insert({
				createdByUserId,
				encryptedKey,
				projectId,
				updatedByUserId,
			})
			.returning("*")
			.execute();

		return ProjectApiKeyEntity.initialize(projectApiKey);
	}

	public async delete(projectId: number): Promise<boolean> {
		const deletedRowsCount = await this.projectApiKeyModel
			.query()
			.delete()
			.where("projectId", projectId)
			.execute();

		return Boolean(deletedRowsCount);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findByApiKey(
		encryptedKey: string,
	): Promise<null | ProjectApiKeyEntity> {
		const projectApiKey = await this.projectApiKeyModel
			.query()
			.findOne({ encryptedKey })
			.execute();

		return projectApiKey ? ProjectApiKeyEntity.initialize(projectApiKey) : null;
	}

	public async findByProjectId(
		projectId: number,
	): Promise<null | ProjectApiKeyEntity> {
		const projectApiKey = await this.projectApiKeyModel
			.query()
			.findOne({ projectId })
			.execute();

		return projectApiKey ? ProjectApiKeyEntity.initialize(projectApiKey) : null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectApiKeyRepository };
