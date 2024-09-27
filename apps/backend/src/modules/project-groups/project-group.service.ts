import { PAGE_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type PaginationQueryParameters,
	type Service,
} from "~/libs/types/types.js";

import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupCreateResponseDto,
	type ProjectGroupGetAllItemResponseDto,
	type ProjectGroupGetAllResponseDto,
	type ProjectGroupPatchRequestDto,
	type ProjectGroupPatchResponseDto,
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
			await this.projectGroupRepository.findByProjectIdAndName({
				name,
				projectId,
			});

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

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.projectGroupRepository.delete(id);

		if (!isDeleted) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return isDeleted;
	}

	public async deleteByProjectId(projectId: number): Promise<boolean> {
		return await this.projectGroupRepository.deleteByProjectId(projectId);
	}

	public async find(id: number): Promise<ProjectGroupGetAllItemResponseDto> {
		const projectGroup = await this.projectGroupRepository.find(id);

		if (!projectGroup) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return projectGroup.toObject();
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findAllByProjectId(
		id: number,
		parameters: PaginationQueryParameters,
	): Promise<ProjectGroupGetAllResponseDto> {
		const projectGroups = await this.projectGroupRepository.findAllByProjectId(
			id,
			{
				page: parameters.page - PAGE_INDEX_OFFSET,
				pageSize: parameters.pageSize,
			},
		);

		return {
			items: projectGroups.items.map((item) => item.toObject()),
			totalItems: projectGroups.totalItems,
		};
	}

	public async findAllByUserId(
		userId: number,
	): Promise<ProjectGroupGetAllItemResponseDto[]> {
		const projectGroups =
			await this.projectGroupRepository.findAllByUserId(userId);

		return projectGroups.map((item) => item.toObject());
	}

	public async patch(
		id: number,
		payload: ProjectGroupPatchRequestDto,
	): Promise<ProjectGroupPatchResponseDto> {
		const projectGroup = await this.projectGroupRepository.find(id);

		if (!projectGroup) {
			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const {
			projectId: { id: projectId },
		} = projectGroup.toObject();

		const { name, permissionIds = [], userIds } = payload;

		const existingProjectGroup =
			await this.projectGroupRepository.findByProjectIdAndName({
				name,
				projectId,
			});

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

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectGroupService };
