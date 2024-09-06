import { type Entity } from "~/libs/types/types.js";
import { type GroupModel } from "~/modules/groups/group.model.js";
import { type PermissionModel } from "~/modules/permissions/permission.model.js";

import { type UserAuthResponseDto } from "./libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: null | string;
	private email: string;
	private groups: Array<
		{
			permissions: Array<Pick<PermissionModel, "key" | "name">>;
		} & Pick<GroupModel, "name">
	>;
	private id: null | number;
	private name: string;
	private passwordHash: string;
	private passwordSalt: string;

	private constructor({
		createdAt,
		email,
		groups = [],
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		createdAt: null | string;
		email: string;
		groups?: Array<
			{
				permissions: Array<Pick<PermissionModel, "key" | "name">>;
			} & Pick<GroupModel, "name">
		>;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.id = id;
		this.email = email;
		this.groups = groups;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.createdAt = createdAt;
	}

	public static initialize({
		createdAt,
		email,
		groups = [],
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		createdAt: string;
		email: string;
		groups?: Array<
			{
				permissions: Array<Pick<PermissionModel, "key" | "name">>;
			} & Pick<GroupModel, "name">
		>;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			groups,
			id,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		email,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt: null,
			email,
			groups: [],
			id: null,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public toNewObject(): {
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): UserAuthResponseDto {
		return {
			createdAt: this.createdAt as string,
			email: this.email,
			groups: this.groups.map((group) => ({
				name: group.name,
				permissions: group.permissions.map((permission) => ({
					key: permission.key,
					name: permission.name,
				})),
			})),
			id: this.id as number,
			name: this.name,
		};
	}
}

export { UserEntity };
