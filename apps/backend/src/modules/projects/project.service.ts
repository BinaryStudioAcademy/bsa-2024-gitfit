import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ProjectError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
	type ProjectUpdateRequestDto,
	type ProjectUpdateResponseDto,
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

	public async findAll(): Promise<ProjectGetAllResponseDto> {
		const items = await this.projectRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async update(
		id: number,
		projectData: ProjectUpdateRequestDto,
	): Promise<ProjectUpdateResponseDto> {
		const existingProject = await this.projectRepository.find(id);

		if (!existingProject) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const projectWithSameName = await this.projectRepository.findByName(
			projectData.name,
		);

		if (projectWithSameName && projectWithSameName.getId() !== id) {
			throw new ProjectError({
				message: ExceptionMessage.PROJECT_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const updatedItem = await this.projectRepository.update(id, projectData);

		return updatedItem.toObject();
	}
}

export { ProjectService };
