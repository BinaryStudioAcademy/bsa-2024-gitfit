import { type Entity } from "~/libs/types/types.js";

import { type ProjectApiKeyCreateResponseDto } from "./libs/types/types.js";

class ProjectApiKeyEntity implements Entity {
	private createdBy!: number;

	private encryptedKey!: string;

	private id: null | number;

	private projectId!: number;

	private updatedBy!: number;

	private constructor({
		createdBy,
		encryptedKey,
		id,
		projectId,
		updatedBy,
	}: {
		createdBy: number;
		encryptedKey: string;
		id: null | number;
		projectId: number;
		updatedBy: number;
	}) {
		this.encryptedKey = encryptedKey;
		this.id = id;
		this.projectId = projectId;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
	}

	public static initialize({
		createdBy,
		encryptedKey,
		id,
		projectId,
		updatedBy,
	}: {
		createdBy: number;
		encryptedKey: string;
		id: number;
		projectId: number;
		updatedBy: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			createdBy,
			encryptedKey,
			id,
			projectId,
			updatedBy,
		});
	}

	public static initializeNew({
		createdBy,
		encryptedKey,
		projectId,
		updatedBy,
	}: {
		createdBy: number;
		encryptedKey: string;
		projectId: number;
		updatedBy: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			createdBy,
			encryptedKey,
			id: null,
			projectId,
			updatedBy,
		});
	}

	public toNewObject(): { encryptedKey: string } & Omit<
		ProjectApiKeyCreateResponseDto,
		"apiKey" | "id"
	> {
		return {
			createdBy: this.createdBy,
			encryptedKey: this.encryptedKey,
			projectId: this.projectId,
			updatedBy: this.updatedBy,
		};
	}

	public toObject(): { encryptedKey: string } & Omit<
		ProjectApiKeyCreateResponseDto,
		"apiKey"
	> {
		return {
			createdBy: this.createdBy,
			encryptedKey: this.encryptedKey,
			id: this.id as number,
			projectId: this.projectId,
			updatedBy: this.updatedBy,
		};
	}
}

export { ProjectApiKeyEntity };
