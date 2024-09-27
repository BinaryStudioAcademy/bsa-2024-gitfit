import { type Entity } from "~/libs/types/types.js";
import { type ProjectPermissionModel } from "~/modules/project-permissions/project-permissions.js";

import { type ProjectModel } from "../projects/project.model.js";
import { type UserModel } from "../users/user.model.js";
import { type ProjectGroupCreateResponseDto } from "./libs/types/types.js";

class ProjectGroupEntity implements Entity {
	private createdAt: null | string;
	private id: null | number;
	private name!: string;
	private permissions!: Partial<Pick<ProjectPermissionModel, "id" | "name">>[];
	private projectId!: Pick<ProjectModel, "id">;
	private users!: Partial<
		Pick<UserModel, "createdAt" | "email" | "id" | "name">
	>[];

	private constructor({
		createdAt,
		id,
		name,
		permissions,
		projectId,
		users,
	}: {
		createdAt: null | string;
		id: null | number;
		name: string;
		permissions: Partial<Pick<ProjectPermissionModel, "id" | "name">>[];
		projectId: Pick<ProjectModel, "id">;
		users: Partial<Pick<UserModel, "createdAt" | "email" | "id" | "name">>[];
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.name = name;
		this.permissions = permissions;
		this.projectId = projectId;
		this.users = users;
	}

	public static initialize({
		createdAt,
		id,
		name,
		permissions,
		projectId: project,
		users,
	}: {
		createdAt: string;
		id: number;
		name: string;
		permissions: Pick<ProjectPermissionModel, "id" | "name">[];
		projectId: Pick<ProjectModel, "id">;
		users: Pick<UserModel, "createdAt" | "email" | "id" | "name">[];
	}): ProjectGroupEntity {
		return new ProjectGroupEntity({
			createdAt,
			id,
			name,
			permissions,
			projectId: project,
			users,
		});
	}

	public static initializeNew({
		name,
		permissions,
		projectId,
		users,
	}: {
		name: string;
		permissions: Pick<ProjectPermissionModel, "id">[];
		projectId: Pick<ProjectModel, "id">;
		users: Pick<UserModel, "id">[];
	}): ProjectGroupEntity {
		return new ProjectGroupEntity({
			createdAt: null,
			id: null,
			name,
			permissions,
			projectId,
			users,
		});
	}

	public toNewObject(): {
		name: string;
		permissions: Pick<ProjectPermissionModel, "id">[];
		projectId: Pick<ProjectModel, "id">;
		users: Pick<UserModel, "id">[];
	} {
		return {
			name: this.name,
			permissions: this.permissions as Pick<
				ProjectPermissionModel,
				"id" | "name"
			>[],
			projectId: this.projectId,
			users: this.users as Pick<
				UserModel,
				"createdAt" | "email" | "id" | "name"
			>[],
		};
	}

	public toObject(): ProjectGroupCreateResponseDto {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			name: this.name,
			permissions: this.permissions.map((permission) => ({
				id: permission.id,
				name: permission.name,
			})) as Pick<ProjectPermissionModel, "id" | "name">[],
			projectId: this.projectId,
			users: this.users.map((user) => ({
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
			})) as Pick<UserModel, "createdAt" | "email" | "id" | "name">[],
		};
	}
}

export { ProjectGroupEntity };
