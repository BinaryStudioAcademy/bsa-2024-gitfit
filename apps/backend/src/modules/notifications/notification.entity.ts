import { type Entity } from "~/libs/types/types.js";

import { type NotificationGetAllItemResponseDto } from "./libs/types/types.js";

class NotificationEntity implements Entity {
	private createdAt: null | string;

	private id: null | number;

	private payload!: string;

	private receiverUserId!: number;

	private constructor({
		createdAt,
		id,
		payload,
		receiverUserId,
	}: {
		createdAt: null | string;
		id: null | number;
		payload: string;
		receiverUserId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.payload = payload;
		this.receiverUserId = receiverUserId;
	}

	public static initialize({
		createdAt,
		id,
		payload,
		receiverUserId,
	}: {
		createdAt: string;
		id: null | number;
		payload: string;
		receiverUserId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt,
			id,
			payload,
			receiverUserId,
		});
	}

	public static initializeNew({
		payload,
		receiverUserId,
	}: {
		payload: string;
		receiverUserId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt: null,
			id: null,
			payload,
			receiverUserId,
		});
	}

	public toNewObject(): {
		payload: string;
		receiverUserId: number;
	} {
		return {
			payload: this.payload,
			receiverUserId: this.receiverUserId,
		};
	}

	public toObject(): NotificationGetAllItemResponseDto {
		return {
			createdAt: this.createdAt as string,
			id: this.id as number,
			payload: this.payload,
		};
	}
}

export { NotificationEntity };
