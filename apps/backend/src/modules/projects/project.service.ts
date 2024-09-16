import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectApiKeyService } from "~/modules/project-api-keys/project-api-key.service.js";

import { ProjectError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
} from "./libs/types/types.js";
import { ProjectEntity } from "./project.entity.js";
import { type ProjectRepository } from "./project.repository.js";

class ProjectService implements Service {
	private projectApiKeyService: ProjectApiKeyService;

	private projectRepository: ProjectRepository;

	public constructor(
		projectRepository: ProjectRepository,
		projectApiKeyService: ProjectApiKeyService,
	) {
		this.projectRepository = projectRepository;
		this.projectApiKeyService = projectApiKeyService;
	}

	public async create(
		payload: ProjectCreateRequestDto,
	): Promise<ProjectGetAllItemResponseDto> {
		const { description, name } = payload;
		const existingProject = await this.projectRepository.findByName(name);

		if (existingProject) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.projectRepository.create(
			ProjectEntity.initializeNew({
				description,
				name,
			}),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.projectRepository.delete(id);

		if (!isDeleted) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return isDeleted;
	}

	public async find(id: number): Promise<ProjectGetByIdResponseDto> {
		const item = await this.projectRepository.find(id);

		if (!item) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const project = item.toObject();

		const projectApiKey = await this.projectApiKeyService.findByProjectId(
			project.id,
		);

		const apiKey = projectApiKey ? projectApiKey.apiKey : null;

		return {
			...project,
			apiKey,
		};
	}

	public async findAll(name?: string): Promise<ProjectGetAllResponseDto> {
		const projects = await this.projectRepository.findAll(name);

		return {
			items: projects.items.map((item) => {
				const { id, name } = item.toObject();

				return { id, name };
			}),
		};
	}

	public async findProjectsByContributorId(
		contributorId: number,
	): Promise<ProjectGetAllResponseDto> {
		const projects =
			await this.projectRepository.findProjectsByContributorId(contributorId);

		return {
			items: projects.items.map((item) => item.toObject()),
		};
	}

	public async patch(
		id: number,
		projectData: ProjectPatchRequestDto,
	): Promise<ProjectPatchResponseDto> {
		const targetProject = await this.projectRepository.find(id);

		if (!targetProject) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingProject = await this.projectRepository.findByName(
			projectData.name,
		);

		if (existingProject && existingProject.toObject().id !== id) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const updatedItem = await this.projectRepository.patch(id, projectData);

		const project = updatedItem.toObject();

		const projectApiKey = await this.projectApiKeyService.findByProjectId(
			project.id,
		);

		const apiKey = projectApiKey ? projectApiKey.apiKey : null;

		return {
			...project,
			apiKey,
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectService };
