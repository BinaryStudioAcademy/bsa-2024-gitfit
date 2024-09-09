import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
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

type Constructor = {
	projectApiKeyRepository: ProjectApiKeyRepository;
	projectRepository: ProjectRepository;
	token: Token;
	userRepository: UserRepository;
};

class ProjectApiKeyService implements Service {
	private projectApiKeyRepository: ProjectApiKeyRepository;

	private projectRepository: ProjectRepository;

	private token: Token;

	private userRepository: UserRepository;

	public constructor({
		projectApiKeyRepository,
		projectRepository,
		token,
		userRepository,
	}: Constructor) {
		this.projectApiKeyRepository = projectApiKeyRepository;
		this.projectRepository = projectRepository;
		this.token = token;
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
				message: ExceptionMessage.PROJECT_API_KEY_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}

		const apiKey = await this.token.createToken({ projectId }, false);
		const encryptedKey = apiKey; // TODO: encrypt

		const createdApiKeyEntity = await this.projectApiKeyRepository.create(
			ProjectApiKeyEntity.initializeNew({
				createdByUserId: userId,
				encryptedKey,
				projectId,
				updatedByUserId: userId,
			}),
		);

		const createdApiKey = createdApiKeyEntity.toObject();

		return {
			apiKey,
			createdByUserId: createdApiKey.createdByUserId,
			id: createdApiKey.id,
			projectId: createdApiKey.projectId,
			updatedByUserId: createdApiKey.updatedByUserId,
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

	public async findByProjectId(
		projectId: number,
	): Promise<null | ProjectApiKeyCreateResponseDto> {
		const apiKeyEnitity =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (!apiKeyEnitity) {
			return null;
		}

		const apiKey = apiKeyEnitity.toObject();
		const decryptedApiKey = apiKey.encryptedKey; // TODO: decrypt

		return {
			apiKey: decryptedApiKey,
			createdByUserId: apiKey.createdByUserId,
			id: apiKey.id,
			projectId: apiKey.projectId,
			updatedByUserId: apiKey.updatedByUserId,
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectApiKeyService };
