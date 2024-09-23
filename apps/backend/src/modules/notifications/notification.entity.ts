import { type Entity } from "~/libs/types/types.js";

import { type NotificationGetAllItemResponseDto } from "./libs/types/types.js";

class NotificationEntity implements Entity {
	private createdAt: null | string;

	private id: null | number;

	private isRead: boolean;

	private payload!: string;

	private receiverUserId!: number;

	private constructor({
		createdAt,
		id,
		isRead,
		payload,
		receiverUserId,
	}: {
		createdAt: null | string;
		id: null | number;
		isRead: boolean;
		payload: string;
		receiverUserId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.isRead = isRead;
		this.payload = payload;
		this.receiverUserId = receiverUserId;
	}

	public static initialize({
		createdAt,
		id,
		isRead,
		payload,
		receiverUserId,
	}: {
		createdAt: string;
		id: null | number;
		isRead: boolean;
		payload: string;
		receiverUserId: number;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt,
			id,
			isRead,
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
			isRead: false,
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
			isRead: this.isRead,
			payload: this.payload,
		};
	}
}

export { NotificationEntity };
