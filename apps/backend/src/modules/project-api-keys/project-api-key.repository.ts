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
		const { createdBy, encryptedKey, projectId, updatedBy } =
			entity.toNewObject();

		const projectApiKey = await this.projectApiKeyModel
			.query()
			.insert({
				createdBy,
				encryptedKey,
				projectId,
				updatedBy,
			})
			.returning("*")
			.execute();

		return ProjectApiKeyEntity.initialize(projectApiKey);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(false);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
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
