import { type Entity } from "~/libs/types/types.js";

import { type PermissionGetAllItemResponseDto } from "./libs/types/types.js";

class PermissionEntity implements Entity {
	private id: null | number;
	private name!: string;

	private constructor({ id, name }: { id: null | number; name: string }) {
		this.id = id;
		this.name = name;
	}

	public static initialize({
		id,
		name,
	}: {
		id: null | number;
		name: string;
	}): PermissionEntity {
		return new PermissionEntity({ id, name });
	}

	public static initializeNew({ name }: { name: string }): PermissionEntity {
		return new PermissionEntity({
			id: null,
			name,
		});
	}

	public toNewObject(): { name: string } {
		return {
			name: this.name,
		};
	}

	public toObject(): PermissionGetAllItemResponseDto {
		return {
			id: this.id as number,
			name: this.name,
		};
	}
}

export { PermissionEntity };
