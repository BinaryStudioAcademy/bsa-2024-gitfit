import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectRepository } from "~/modules/projects/projects.js";
import { type UserRepository } from "~/modules/users/users.js";

import { ProjectApiKeyError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "./libs/types/types.js";
import { ProjectApiKeyEntity } from "./project-api-key.entity.js";
import { type ProjectApiKeyRepository } from "./project-api-key.repository.js";

class ProjectApiKeyService implements Service {
	private projectApiKeyRepository: ProjectApiKeyRepository;

	private projectRepository: ProjectRepository;

	private userRepository: UserRepository;

	public constructor(
		projectApiKeyRepository: ProjectApiKeyRepository,
		projectRepository: ProjectRepository,
		userRepository: UserRepository,
	) {
		this.projectApiKeyRepository = projectApiKeyRepository;
		this.projectRepository = projectRepository;
		this.userRepository = userRepository;
	}

	public async create(
		payload: ProjectApiKeyCreateRequestDto,
	): Promise<ProjectApiKeyCreateResponseDto> {
		const { projectId, userId } = payload;

		const isProjectExist = Boolean(
			await this.projectRepository.find(projectId),
		);

		if (!isProjectExist) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const isUserExist = Boolean(await this.userRepository.find(userId));

		if (!isUserExist) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const isProjectApiKeyExist = Boolean(
			await this.projectApiKeyRepository.findByProjectId(projectId),
		);

		if (isProjectApiKeyExist) {
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
