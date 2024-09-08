import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ProjectApiKeyService } from "~/modules/project-api-keys/project-api-key.service.js";

import { ProjectError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
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

	private async injectProjectApiKeyToProject(
		project: ProjectGetAllItemResponseDto,
	): Promise<ProjectGetAllItemResponseDto> {
		const projectApiKey = await this.projectApiKeyService.findByProjectId(
			project.id,
		);
		const apiKey = projectApiKey ? projectApiKey.apiKey : null;

		return {
			...project,
			apiKey,
		};
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

	public async find(id: number): Promise<ProjectGetAllItemResponseDto> {
		const item = await this.projectRepository.find(id);

		if (!item) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.injectProjectApiKeyToProject(item.toObject());
	}

	public async findAll(): Promise<ProjectGetAllResponseDto> {
		const projects = await this.projectRepository.findAll();

		return {
			items: projects.items.map((item) => item.toObject()),
		};
	}

	public async findAllbyName(
		query: ProjectGetAllRequestDto,
	): Promise<ProjectGetAllResponseDto> {
		const items = await this.projectRepository.findAllbyName(query.name);

		return {
			items: items.map((item) => item.toObject()),
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

		return await this.injectProjectApiKeyToProject(updatedItem.toObject());
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectService };
