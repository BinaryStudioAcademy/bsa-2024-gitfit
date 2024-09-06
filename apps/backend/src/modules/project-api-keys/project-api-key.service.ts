import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ProjectApiKeyError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "./libs/types/types.js";
import { ProjectApiKeyEntity } from "./project-api-key.entity.js";
import { type ProjectApiKeyRepository } from "./project-api-key.repository.js";

class ProjectApiKeyService implements Service {
	private projectApiKeyRepository: ProjectApiKeyRepository;

	public constructor(projectApiKeyRepository: ProjectApiKeyRepository) {
		this.projectApiKeyRepository = projectApiKeyRepository;
	}

	public async create(
		payload: ProjectApiKeyCreateRequestDto,
	): Promise<ProjectApiKeyCreateResponseDto> {
		const { projectId, userId } = payload;

		const existingProjectApiKey =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (existingProjectApiKey) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_API_KEY_ALREADY_HAS,
				status: HTTPCode.CONFLICT,
			});
		}

		const apiKey = "API_KEY"; // TODO: generate api key based on projectId and userId
		const encryptedKey = apiKey; // TODO: encrypt

		const createdApiKeyEntity = await this.projectApiKeyRepository.create(
			ProjectApiKeyEntity.initializeNew({
				createdBy: userId,
				encryptedKey,
				projectId,
				updatedBy: userId,
			}),
		);

		const createdApiKey = createdApiKeyEntity.toObject();

		return {
			apiKey,
			createdBy: createdApiKey.createdBy,
			id: createdApiKey.id,
			projectId: createdApiKey.projectId,
			updatedBy: createdApiKey.updatedBy,
		};
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectApiKeyService };
