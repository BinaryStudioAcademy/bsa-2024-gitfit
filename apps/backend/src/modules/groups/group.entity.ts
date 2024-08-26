import { type Entity } from "~/libs/types/types.js";

import { type GroupCreateResponseDto } from "./libs/types/types.js";

class GroupEntity implements Entity {
	private id: null | number;
	private name!: string;
	private permissionIds!: number[];
	private userIds!: number[];

	private constructor({
		id,
		name,
		permissionIds,
		userIds,
	}: {
		id: null | number;
		name: string;
		permissionIds: number[];
		userIds: number[];
	}) {
		this.id = id;
		this.name = name;
		this.userIds = userIds;
		this.permissionIds = permissionIds;
	}

	public static initialize({
		id,
		name,
		permissionIds,
		userIds,
	}: {
		id: number;
		name: string;
		permissionIds: number[];
		userIds: number[];
	}): GroupEntity {
		return new GroupEntity({
			id,
			name,
			permissionIds,
			userIds,
		});
	}

	public static initializeNew({
		name,
		permissionIds,
		userIds,
	}: {
		name: string;
		permissionIds: number[];
		userIds: number[];
	}): GroupEntity {
		return new GroupEntity({
			id: null,
			name,
			permissionIds,
			userIds,
		});
	}

	public toNewObject(): {
		name: string;
		permissionIds: number[];
		userIds: number[];
	} {
		return {
			name: this.name,
			permissionIds: this.permissionIds,
			userIds: this.userIds,
		};
	}

	public toObject(): GroupCreateResponseDto {
		return {
			id: this.id as number,
			name: this.name,
			permissionIds: this.permissionIds,
			userIds: this.userIds,
		};
	}
}

export { GroupEntity };
