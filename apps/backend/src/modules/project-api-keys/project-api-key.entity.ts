import { type Entity } from "~/libs/types/types.js";

import { type ProjectApiKeyCreateResponseDto } from "./libs/types/types.js";

class ProjectApiKeyEntity implements Entity {
	private encodedKey!: string;

	private id: null | number;

	private projectId!: number;

	private userId!: number;

	private constructor({
		encodedKey,
		id,
		projectId,
		userId,
	}: {
		encodedKey: string;
		id: null | number;
		projectId: number;
		userId: number;
	}) {
		this.encodedKey = encodedKey;
		this.id = id;
		this.projectId = projectId;
		this.userId = userId;
	}

	public static initialize({
		encodedKey,
		id,
		projectId,
		userId,
	}: {
		encodedKey: string;
		id: number;
		projectId: number;
		userId: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			encodedKey,
			id,
			projectId,
			userId,
		});
	}

	public static initializeNew({
		encodedKey,
		projectId,
		userId,
	}: {
		encodedKey: string;
		projectId: number;
		userId: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			encodedKey,
			id: null,
			projectId,
			userId,
		});
	}

	public toNewObject(): Omit<ProjectApiKeyCreateResponseDto, "id"> {
		return {
			apiKey: this.encodedKey,
			projectId: this.projectId,
			userId: this.userId,
		};
	}

	public toObject(): ProjectApiKeyCreateResponseDto {
		return {
			apiKey: this.encodedKey,
			id: this.id as number,
			projectId: this.projectId,
			userId: this.userId,
		};
	}
}

export { ProjectApiKeyEntity };
