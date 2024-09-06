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

	private async joinProjectApiKeyToProject(
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

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<ProjectGetAllItemResponseDto> {
		const item = await this.projectRepository.find(id);

		if (!item) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.joinProjectApiKeyToProject(item.toObject());
	}

	public async findAll(): Promise<ProjectGetAllResponseDto> {
		const projects = await this.projectRepository.findAll();

		return {
			items: await Promise.all(
				projects.items.map((item) =>
					this.joinProjectApiKeyToProject(item.toObject()),
				),
			),
		};
	}

	public async findAllbyName(
		query: ProjectGetAllRequestDto,
	): Promise<ProjectGetAllResponseDto> {
		const items = await this.projectRepository.findAllbyName(query.name);

		return {
			items: await Promise.all(
				items.map((item) => this.joinProjectApiKeyToProject(item.toObject())),
			),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectService };
