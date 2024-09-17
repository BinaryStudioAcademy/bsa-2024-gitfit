import { type Repository } from "~/libs/types/types.js";

import { ProjectPermissionEntity } from "./project-permissions.entity.js";
import { type ProjectPermissionModel } from "./project-permissions.model.js";

class ProjectPermissionRepository implements Repository {
	private projectPermissionModel: typeof ProjectPermissionModel;

	public constructor(projectPermissionModel: typeof ProjectPermissionModel) {
		this.projectPermissionModel = projectPermissionModel;
	}

	public create(): ReturnType<Repository["create"]> {
		return Promise.resolve(null);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<{ items: ProjectPermissionEntity[] }> {
		const projectPermissions = await this.projectPermissionModel
			.query()
			.execute();

		return {
			items: projectPermissions.map((projectPermission) =>
				ProjectPermissionEntity.initialize(projectPermission),
			),
		};
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectPermissionRepository };
