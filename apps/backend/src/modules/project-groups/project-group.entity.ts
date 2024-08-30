import { type Entity } from "~/libs/types/types.js";

import { type ProjectModel } from "../projects/project.model.js";
import { type UserModel } from "../users/user.model.js";
import { type ProjectGroupCreateResponseDto } from "./libs/types/types.js";
import { type ProjectPermissionModel } from "./project-permission.model.js";

class ProjectGroupEntity implements Entity {
	private id: null | number;
	private name!: string;
	private permissions!: Pick<ProjectPermissionModel, "id">[];
	private projectId!: Pick<ProjectModel, "id">;
	private users!: Pick<UserModel, "id">[];

	private constructor({
		id,
		name,
		permissions,
		projectId,
		users,
	}: {
		id: null | number;
		name: string;
		permissions: Pick<ProjectPermissionModel, "id">[];
		projectId: Pick<ProjectModel, "id">;
		users: Pick<UserModel, "id">[];
	}) {
		this.id = id;
		this.name = name;
		this.permissions = permissions;
		this.projectId = projectId;
		this.users = users;
	}

	public static initialize({
		id,
		name,
		permissions,
		projectId,
		users,
	}: {
		id: number;
		name: string;
		permissions: Pick<ProjectPermissionModel, "id">[];
		projectId: Pick<ProjectModel, "id">;
		users: Pick<UserModel, "id">[];
	}): ProjectGroupEntity {
		return new ProjectGroupEntity({
			id,
			name,
			permissions,
			projectId,
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
			permissions: this.permissions,
			projectId: this.projectId,
			users: this.users,
		};
	}

	public toObject(): ProjectGroupCreateResponseDto {
		return {
			id: this.id as number,
			name: this.name,
			permissions: this.permissions,
			projectId: this.projectId,
			users: this.users,
		};
	}
}

export { ProjectGroupEntity };
