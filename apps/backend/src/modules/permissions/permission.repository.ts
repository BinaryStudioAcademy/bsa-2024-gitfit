import { type Repository } from "~/libs/types/types.js";

import { PermissionEntity } from "./permission.entity.js";
import { type PermissionModel } from "./permission.model.js";

class PermissionRepository implements Repository {
	private permissionModel: typeof PermissionModel;

	public constructor(permissionModel: typeof PermissionModel) {
		this.permissionModel = permissionModel;
	}

	public create(): ReturnType<Repository["create"]> {
		return Promise.resolve(true);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<PermissionEntity[]> {
		const permissions = await this.permissionModel.query();

		return permissions.map((permission) =>
			PermissionEntity.initialize(permission),
		);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { PermissionRepository };
