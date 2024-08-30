import { type Entity } from "~/libs/types/types.js";

import { type UserModel } from "../users/user.model.js";
import {
	type GroupCreateResponseDto,
	type GroupGetAllItemResponseDto,
} from "./libs/types/types.js";

class GroupEntity implements Entity {
	private createdAt: null | string;
	private id: null | number;
	private name!: string;
	private permissions!: Array<{ id: number; name?: string }>;
	private users!: Pick<UserModel, "id">[];

	private constructor({
		createdAt,
		id,
		name,
		permissions,
		users,
	}: {
		createdAt: null | string;
		id: null | number;
		name: string;
		permissions: Array<{ id: number; name?: string }>;
		users: Pick<UserModel, "id">[];
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.name = name;
		this.permissions = permissions;
		this.users = users;
	}

	public static initialize({
		createdAt,
		id,
		name,
		permissions,
		users,
	}: {
		createdAt: string;
		id: null | number;
		name: string;
		permissions: Array<{ id: number; name: string }>;
		users: Pick<UserModel, "id">[];
	}): GroupEntity {
		return new GroupEntity({ createdAt, id, name, permissions, users });
	}

	public static initializeNew({
		name,
		permissions,
		users,
	}: {
		name: string;
		permissions: Array<{ id: number }>;
		users: Pick<UserModel, "id">[];
	}): GroupEntity {
		return new GroupEntity({
			createdAt: null,
			id: null,
			name,
			permissions,
			users,
		});
	}

	public toGetAllItemObject(): GroupGetAllItemResponseDto {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			name: this.name,
			permissions: this.permissions.map((permission) => ({
				id: permission.id,
				name: permission.name,
			})) as Array<{ id: number; name: string }>,
			users: this.users.map((user) => ({ id: user.id })),
		};
	}

	public toNewObject(): {
		name: string;
		permissions: Array<{ id: number }>;
		users: Pick<UserModel, "id">[];
	} {
		return {
			name: this.name,
			permissions: this.permissions.map(({ id }) => ({ id })),
			users: this.users,
		};
	}

	public toObject(): GroupCreateResponseDto {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			name: this.name,
			permissions: this.permissions.map(({ id }) => ({ id })),
			users: this.users,
		};
	}
}

export { GroupEntity };
