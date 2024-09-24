import { type Entity } from "~/libs/types/types.js";

import { NotificationStatus } from "./libs/enums/enums.js";
import {
	type NotificationGetAllItemResponseDto,
	type NotificationStatusValue,
} from "./libs/types/types.js";

class NotificationEntity implements Entity {
	private createdAt: null | string;

	private id: null | number;

	private payload!: string;

	private receiverUserId!: number;

	private status!: NotificationStatusValue;

	private constructor({
		createdAt,
		id,
		payload,
		receiverUserId,
		status,
	}: {
		createdAt: null | string;
		id: null | number;
		payload: string;
		receiverUserId: number;
		status: NotificationStatusValue;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.payload = payload;
		this.receiverUserId = receiverUserId;
		this.status = status;
	}

	public static initialize({
		createdAt,
		id,
		payload,
		receiverUserId,
		status,
	}: {
		createdAt: string;
		id: null | number;
		payload: string;
		receiverUserId: number;
		status: NotificationStatusValue;
	}): NotificationEntity {
		return new NotificationEntity({
			createdAt,
			id,
			payload,
			receiverUserId,
			status,
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
			status: NotificationStatus.UNREAD,
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
			status: this.status,
		};
	}
}

export { NotificationEntity };
