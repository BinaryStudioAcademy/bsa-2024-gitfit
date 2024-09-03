import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

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
	private projectRepository: ProjectRepository;

	public constructor(projectRepository: ProjectRepository) {
		this.projectRepository = projectRepository;
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

		return item.toObject();
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
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

		return updatedItem.toObject();
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve();
	}
}

export { ProjectService };
