import { ExceptionMessage } from "~/libs/enums/enums.js";
import { type Encryption } from "~/libs/modules/encryption/encryption.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Token } from "~/libs/modules/token/token.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectRepository } from "~/modules/projects/project.repository.js";

import { ProjectApiKeyError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
	type ProjectApiKeyPatchRequestDto,
	type ProjectApiKeyPatchResponseDto,
} from "./libs/types/types.js";
import { ProjectApiKeyEntity } from "./project-api-key.entity.js";
import { type ProjectApiKeyRepository } from "./project-api-key.repository.js";

type Constructor = {
	encryption: Encryption;
	projectApiKeyRepository: ProjectApiKeyRepository;
	projectRepository: ProjectRepository;
	token: Token;
};

class ProjectApiKeyService implements Service {
	private encryption: Encryption;

	private projectApiKeyRepository: ProjectApiKeyRepository;

	private projectRepository: ProjectRepository;

	private token: Token;

	public constructor({
		encryption,
		projectApiKeyRepository,
		projectRepository,
		token,
	}: Constructor) {
		this.projectApiKeyRepository = projectApiKeyRepository;
		this.token = token;
		this.projectRepository = projectRepository;
		this.encryption = encryption;
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

		const existingProjectApiKey =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (existingProjectApiKey) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_API_KEY_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
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

	public async findByProjectId(
		projectId: number,
	): Promise<null | ProjectApiKeyCreateResponseDto> {
		const apiKeyEnitity =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (!apiKeyEnitity) {
			return null;
		}

		const apiKey = apiKeyEnitity.toObject();
		const decryptedApiKey = this.encryption.decrypt(apiKey.encryptedKey);

		return {
			apiKey: decryptedApiKey,
			createdByUserId: apiKey.createdByUserId,
			id: apiKey.id,
			projectId: apiKey.projectId,
			updatedByUserId: apiKey.updatedByUserId,
		};
	}

	public async patch(
		payload: { userId: number } & ProjectApiKeyPatchRequestDto,
	): Promise<ProjectApiKeyPatchResponseDto> {
		const { projectId, userId } = payload;

		const existingProject = await this.projectRepository.find(projectId);

		if (!existingProject) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingProjectApiKey =
			await this.projectApiKeyRepository.findByProjectId(projectId);

		if (!existingProjectApiKey) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_API_KEY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const newApiKey = await this.token.createToken({ projectId });
		const encryptedNewKey = this.encryption.encrypt(newApiKey);

		const updatedApiKeyEntity = await this.projectApiKeyRepository.patch(
			projectId,
			userId,
			encryptedNewKey,
		);

		if (!updatedApiKeyEntity) {
			throw new ProjectApiKeyError({
				message: ExceptionMessage.PROJECT_API_KEY_UPDATE_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return {
			apiKey: newApiKey,
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectApiKeyService };
