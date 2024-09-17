import { type Service } from "~/libs/types/types.js";

import { type ProjectPermissionsGetAllResponseDto } from "./libs/types/types.js";
import { type ProjectPermissionRepository } from "./project-permissions.repository.js";

class ProjectPermissionService implements Service {
	private projectPermissionRepository: ProjectPermissionRepository;

	public constructor(projectPermissionRepository: ProjectPermissionRepository) {
		this.projectPermissionRepository = projectPermissionRepository;
	}

	public create(): ReturnType<Service["create"]> {
		return Promise.resolve(null);
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<ProjectPermissionsGetAllResponseDto> {
		const result = await this.projectPermissionRepository.findAll();

		return {
			items: result.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectPermissionService };
