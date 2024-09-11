import { type Entity } from "~/libs/types/types.js";

import { type ProjectApiKeyCreateResponseDto } from "./libs/types/types.js";

class ProjectApiKeyEntity implements Entity {
	private createdByUserId!: number;

	private encryptedKey!: string;

	private id: null | number;

	private projectId!: number;

	private updatedByUserId!: number;

	private constructor({
		createdByUserId,
		encryptedKey,
		id,
		projectId,
		updatedByUserId,
	}: {
		createdByUserId: number;
		encryptedKey: string;
		id: null | number;
		projectId: number;
		updatedByUserId: number;
	}) {
		this.encryptedKey = encryptedKey;
		this.id = id;
		this.projectId = projectId;
		this.createdByUserId = createdByUserId;
		this.updatedByUserId = updatedByUserId;
	}

	public static initialize({
		createdByUserId,
		encryptedKey,
		id,
		projectId,
		updatedByUserId,
	}: {
		createdByUserId: number;
		encryptedKey: string;
		id: number;
		projectId: number;
		updatedByUserId: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			createdByUserId,
			encryptedKey,
			id,
			projectId,
			updatedByUserId,
		});
	}

	public static initializeNew({
		createdByUserId,
		encryptedKey,
		projectId,
		updatedByUserId,
	}: {
		createdByUserId: number;
		encryptedKey: string;
		projectId: number;
		updatedByUserId: number;
	}): ProjectApiKeyEntity {
		return new ProjectApiKeyEntity({
			createdByUserId,
			encryptedKey,
			id: null,
			projectId,
			updatedByUserId,
		});
	}

	public toNewObject(): { encryptedKey: string } & Omit<
		ProjectApiKeyCreateResponseDto,
		"apiKey" | "id"
	> {
		return {
			createdByUserId: this.createdByUserId,
			encryptedKey: this.encryptedKey,
			projectId: this.projectId,
			updatedByUserId: this.updatedByUserId,
		};
	}

	public toObject(): { encryptedKey: string } & Omit<
		ProjectApiKeyCreateResponseDto,
		"apiKey"
	> {
		return {
			createdByUserId: this.createdByUserId,
			encryptedKey: this.encryptedKey,
			id: this.id as number,
			projectId: this.projectId,
			updatedByUserId: this.updatedByUserId,
		};
	}
}

export { ProjectApiKeyEntity };
