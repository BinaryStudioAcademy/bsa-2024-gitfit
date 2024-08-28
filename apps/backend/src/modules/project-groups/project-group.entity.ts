import { type Entity } from "~/libs/types/types.js";

import { type ProjectGroupCreateResponseDto } from "./libs/types/types.js";

class ProjectGroupEntity implements Entity {
	private id: null | number;
	private name!: string;
	private permissionIds!: { id: number }[];
	private projectId!: { id: number };
	private userIds!: { id: number }[];

	private constructor({
		id,
		name,
		permissionIds,
		projectId,
		userIds,
	}: {
		id: null | number;
		name: string;
		permissionIds: { id: number }[];
		projectId: { id: number };
		userIds: { id: number }[];
	}) {
		this.id = id;
		this.name = name;
		this.permissionIds = permissionIds;
		this.projectId = projectId;
		this.userIds = userIds;
	}

	public static initialize({
		id,
		name,
		permissionIds,
		projectId,
		userIds,
	}: {
		id: number;
		name: string;
		permissionIds: { id: number }[];
		projectId: { id: number };
		userIds: { id: number }[];
	}): ProjectGroupEntity {
		return new ProjectGroupEntity({
			id,
			name,
			permissionIds,
			projectId,
			userIds,
		});
	}

	public static initializeNew({
		name,
		permissionIds,
		projectId,
		userIds,
	}: {
		name: string;
		permissionIds: { id: number }[];
		projectId: { id: number };
		userIds: { id: number }[];
	}): ProjectGroupEntity {
		return new ProjectGroupEntity({
			id: null,
			name,
			permissionIds,
			projectId,
			userIds,
		});
	}

	public toNewObject(): {
		name: string;
		permissionIds: { id: number }[];
		projectId: { id: number };
		userIds: { id: number }[];
	} {
		return {
			name: this.name,
			permissionIds: this.permissionIds,
			projectId: this.projectId,
			userIds: this.userIds,
		};
	}

	public toObject(): ProjectGroupCreateResponseDto {
		return {
			id: this.id as number,
			name: this.name,
			permissionIds: this.permissionIds.map((perm) => perm.id),
			projectId: this.projectId.id,
			userIds: this.userIds.map((user) => user.id),
		};
	}
}

export { ProjectGroupEntity };
