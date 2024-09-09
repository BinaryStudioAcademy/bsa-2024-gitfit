import { type Service } from "~/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { type PermissionGetAllResponseDto } from "./libs/types/types.js";
import { type PermissionRepository } from "./permission.repository.js";

class PermissionService implements Service {
	private permissionRepository: PermissionRepository;
	private userService: UserService;

	public constructor(
		permissionRepository: PermissionRepository,
		userService: UserService,
	) {
		this.permissionRepository = permissionRepository;
		this.userService = userService;
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

	public async findAll(): Promise<PermissionGetAllResponseDto> {
		const result = await this.permissionRepository.findAll();

		return {
			items: result.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { PermissionService };
