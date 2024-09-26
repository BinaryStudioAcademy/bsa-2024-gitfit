import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { type Entity } from "~/libs/types/types.js";
import { type GroupModel } from "~/modules/groups/group.model.js";
import { type PermissionModel } from "~/modules/permissions/permission.model.js";
import { type ProjectGroupModel } from "~/modules/project-groups/project-group.model.js";
import { type ProjectPermissionModel } from "~/modules/project-permissions/project-permissions.model.js";

import { type UserAuthResponseDto } from "./libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: null | string;
	private deletedAt: null | string;
	private email: string;
	private groups: Array<
		{
			permissions: Array<Pick<PermissionModel, "id" | "key" | "name">>;
		} & Pick<GroupModel, "id" | "name">
	>;
	private id: null | number;
	private name: string;
	private passwordHash: string;
	private passwordSalt: string;
	private projectGroups: Array<
		{
			permissions: Array<Pick<ProjectPermissionModel, "id" | "key" | "name">>;
			projects: Array<{ id: number }>;
		} & Pick<ProjectGroupModel, "id" | "name">
	>;

	private constructor({
		createdAt,
		deletedAt,
		email,
		groups = [],
		id,
		name,
		passwordHash,
		passwordSalt,
		projectGroups = [],
	}: {
		createdAt: null | string;
		deletedAt: null | string;
		email: string;
		groups?: Array<
			{
				permissions: Array<Pick<PermissionModel, "id" | "key" | "name">>;
			} & Pick<GroupModel, "id" | "name">
		>;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		projectGroups?: Array<
			{
				permissions: Array<Pick<ProjectPermissionModel, "id" | "key" | "name">>;
				projects: Array<{ id: number }>;
			} & Pick<ProjectGroupModel, "id" | "name">
		>;
	}) {
		this.id = id;
		this.email = email;
		this.groups = groups;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.projectGroups = projectGroups;
		this.createdAt = createdAt;
		this.deletedAt = deletedAt;
	}

	public static initialize({
		createdAt,
		deletedAt,
		email,
		groups = [],
		id,
		name,
		passwordHash,
		passwordSalt,
		projectGroups = [],
	}: {
		createdAt: string;
		deletedAt: null | string;
		email: string;
		groups?: Array<
			{
				permissions: Array<Pick<PermissionModel, "id" | "key" | "name">>;
			} & Pick<GroupModel, "id" | "name">
		>;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		projectGroups?: Array<
			{
				permissions?: Array<
					Pick<ProjectPermissionModel, "id" | "key" | "name">
				>;
				projects?: Array<{ id: number }>;
			} & Pick<ProjectGroupModel, "id" | "name">
		>;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			deletedAt,
			email,
			groups,
			id,
			name,
			passwordHash,
			passwordSalt,
			projectGroups: projectGroups.map(
				({ permissions, projects, ...group }) => ({
					permissions: permissions ?? [],
					projects: projects ?? [],
					...group,
				}),
			),
		});
	}

	public static initializeNew({
		email,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		groups: Array<
			{
				permissions: Array<Pick<PermissionModel, "id" | "key" | "name">>;
			} & Pick<GroupModel, "id" | "name">
		>;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		projectGroups: Array<
			{
				permissions: Array<Pick<ProjectPermissionModel, "id" | "key" | "name">>;
			} & Pick<ProjectGroupModel, "id" | "name" | "projects">
		>;
	}): UserEntity {
		return new UserEntity({
			createdAt: null,
			deletedAt: null,
			email,
			groups: [],
			id: null,
			name,
			passwordHash,
			passwordSalt,
			projectGroups: [],
		});
	}

	public toNewObject(): {
		email: string;
		groups: Array<Pick<GroupModel, "id" | "name">>;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		projectGroups: Array<Pick<ProjectGroupModel, "id" | "name">>;
	} {
		return {
			email: this.email,
			groups: this.groups,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			projectGroups: this.projectGroups,
		};
	}

	public toObject(): UserAuthResponseDto {
		return {
			createdAt: this.createdAt as string,
			email: this.email,
			groups: this.groups.map((group) => ({
				id: group.id,
				name: group.name,
				permissions: group.permissions.map((permission) => ({
					id: permission.id,
					key: permission.key,
					name: permission.name,
				})),
			})),
			id: this.id as number,
			name: this.name,
			projectGroups: this.projectGroups.map((projectGroup) => ({
				id: projectGroup.id,
				name: projectGroup.name,
				permissions: projectGroup.permissions.map((permissions) => ({
					id: permissions.id,
					key: permissions.key,
					name: permissions.name,
				})),
				projectId:
					projectGroup.projects.length === EMPTY_LENGTH
						? EMPTY_LENGTH
						: (projectGroup.projects[EMPTY_LENGTH]?.id ?? EMPTY_LENGTH),
			})),
		};
	}
}

export { UserEntity };
