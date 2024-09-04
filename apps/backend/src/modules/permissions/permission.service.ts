import { type Service } from "~/libs/types/types.js";

import { type PermissionGetAllResponseDto } from "./libs/types/types.js";
import { type PermissionRepository } from "./permission.repository.js";

class PermissionService implements Service {
	private permissionRepository: PermissionRepository;

	public constructor(permissionRepository: PermissionRepository) {
		this.permissionRepository = permissionRepository;
	}

	public create(): ReturnType<Service["create"]> {
		return Promise.resolve(true);
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<PermissionGetAllResponseDto> {
		const permissions = await this.permissionRepository.findAll();

		return {
			items: permissions.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { PermissionService };
