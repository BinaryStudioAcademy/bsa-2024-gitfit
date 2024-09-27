import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encryption } from "~/libs/modules/encryption/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectRepository } from "~/modules/projects/project.repository.js";
import { type UserService } from "~/modules/users/users.js";

import { ProjectApiKeyError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "./libs/types/types.js";
import { ProjectApiKeyEntity } from "./project-api-key.entity.js";
import { type ProjectApiKeyRepository } from "./project-api-key.repository.js";

type Constructor = {
	encryption: Encryption;
	projectApiKeyRepository: ProjectApiKeyRepository;
	projectRepository: ProjectRepository;
	token: Token;
	userService: UserService;
};

class ProjectApiKeyService implements Service {
	private encryption: Encryption;

	private projectApiKeyRepository: ProjectApiKeyRepository;

	private projectRepository: ProjectRepository;

	private token: Token;

	private userService: UserService;

	public constructor({
		encryption,
		projectApiKeyRepository,
		projectRepository,
		token,
		userService,
	}: Constructor) {
		this.projectApiKeyRepository = projectApiKeyRepository;
		this.token = token;
		this.projectRepository = projectRepository;
		this.encryption = encryption;
		this.userService = userService;
	}

	public async create(
		payload: { userId: number } & ProjectApiKeyCreateRequestDto,
	): Promise<ProjectApiKeyCreateResponseDto> {
		const { projectId, userId } = payload;

		const existingProject = await this.projectRepository.find(projectId);

		if (!existingProject) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		try {
			await this.userService.find(userId);
		} catch {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingProjectApiKey =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (existingProjectApiKey) {
			await this.projectApiKeyRepository.delete(projectId);
		}

		const apiKey = await this.token.createToken({ projectId });
		const encryptedKey = this.encryption.encrypt(apiKey);

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

	public async findByApiKey(
		projectApiKey: string,
	): Promise<ProjectApiKeyCreateResponseDto> {
		const encryptedKey = this.encryption.encrypt(projectApiKey);

		const apiKeyEntity =
			await this.projectApiKeyRepository.findByApiKey(encryptedKey);

		if (!apiKeyEntity) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_API_KEY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const apiKey = apiKeyEntity.toObject();
		const decryptedApiKey = this.encryption.decrypt(apiKey.encryptedKey);

		return {
			apiKey: decryptedApiKey,
			createdByUserId: apiKey.createdByUserId,
			id: apiKey.id,
			projectId: apiKey.projectId,
			updatedByUserId: apiKey.updatedByUserId,
		};
	}

	public async findByProjectId(
		projectId: number,
	): Promise<null | ProjectApiKeyCreateResponseDto> {
		const apiKeyEntity =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (!apiKeyEntity) {
			return null;
		}

		const apiKey = apiKeyEntity.toObject();
		const decryptedApiKey = this.encryption.decrypt(apiKey.encryptedKey);

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
