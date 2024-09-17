import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupCreateResponseDto,
	type ProjectGroupUpdateRequestDto,
	type ProjectGroupUpdateResponseDto,
} from "./libs/types/types.js";
import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupRepository } from "./project-group.repository.js";

class ProjectGroupService implements Service {
	private projectGroupRepository: ProjectGroupRepository;

	public constructor(projectGroupRepository: ProjectGroupRepository) {
		this.projectGroupRepository = projectGroupRepository;
	}

	public async create(
		payload: ProjectGroupCreateRequestDto,
	): Promise<ProjectGroupCreateResponseDto> {
		const { name, permissionIds = [], projectId, userIds } = payload;

		const existingProjectGroup =
			await this.projectGroupRepository.findInProjectByName(projectId, name);

		if (existingProjectGroup) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const permissions = permissionIds.map((id) => ({ id }));
		const users = userIds.map((id) => ({ id }));

		const item = await this.projectGroupRepository.create(
			ProjectGroupEntity.initializeNew({
				name,
				permissions,
				projectId: { id: projectId },
				users,
			}),
		);

		return item.toObject();
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

	public async update(
		id: number,
		payload: ProjectGroupUpdateRequestDto,
	): Promise<ProjectGroupUpdateResponseDto> {
		const projectGroup = await this.projectGroupRepository.find(id);

		if (!projectGroup) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { name, permissionIds = [], projectId, userIds } = payload;

		const existingProjectGroup =
			await this.projectGroupRepository.findInProjectByName(projectId, name);

		if (existingProjectGroup && existingProjectGroup.id !== id) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const permissions = permissionIds.map((id) => ({ id }));
		const users = userIds.map((id) => ({ id }));

		const updatedProjectGroup = await this.projectGroupRepository.update(
			id,
			ProjectGroupEntity.initializeNew({
				name,
				permissions,
				projectId: { id: projectId },
				users,
			}),
		);

		return updatedProjectGroup.toObject();
	}
}

export { ProjectGroupService };
