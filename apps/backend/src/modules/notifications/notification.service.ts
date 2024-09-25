import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { NotificationError } from "./libs/exceptions/exceptions.js";
import {
	type NotificationBulkCreateRequestDto,
	type NotificationBulkCreateResponseDto,
	type NotificationBulkMarkAsReadRequestDto,
	type NotificationCreateRequestDto,
	type NotificationGetAllItemResponseDto,
	type NotificationGetAllRequestDto,
	type NotificationGetAllResponseDto,
} from "./libs/types/types.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationRepository } from "./notification.repository.js";

class NotificationService implements Service {
	private notificationRepository: NotificationRepository;

	public constructor(notificationRepository: NotificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	public async bulkCreate(
		payload: NotificationBulkCreateRequestDto,
	): Promise<NotificationBulkCreateResponseDto> {
		const { payload: notificationPayload, receiverUserIds } = payload;

		const notificationEntities = receiverUserIds.map((receiverUserId) =>
			NotificationEntity.initializeNew({
				payload: notificationPayload,
				receiverUserId,
			}),
		);

		const createdItems =
			await this.notificationRepository.bulkCreate(notificationEntities);

		return {
			items: createdItems.map((item) => item.toObject()),
		};
	}

	public async bulkMarkAsRead({
		notificationIds,
	}: NotificationBulkMarkAsReadRequestDto): Promise<boolean> {
		const updatedCount = await this.notificationRepository.bulkMarkAsRead({
			notificationIds,
		});

		if (!updatedCount || updatedCount !== notificationIds.length) {
			throw new NotificationError({
				message: ExceptionMessage.NOTIFICATION_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return Boolean(updatedCount);
	}

	public async create(
		payload: NotificationCreateRequestDto,
	): Promise<NotificationGetAllItemResponseDto> {
		const { payload: notificationPayload, receiverUserId } = payload;

		const item = await this.notificationRepository.create(
			NotificationEntity.initializeNew({
				payload: notificationPayload,
				receiverUserId,
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(
		parameters: NotificationGetAllRequestDto,
	): Promise<NotificationGetAllResponseDto> {
		const notifications = await this.notificationRepository.findAll(parameters);

		return {
			items: notifications.items.map((item) => item.toObject()),
			totalItems: notifications.totalItems,
		};
	}

	public async getUnreadCount(
		userId: number,
	): Promise<Pick<NotificationGetAllResponseDto, "items">> {
		const unreadNotifications =
			await this.notificationRepository.getUnreadCount(userId);

		return {
			items: unreadNotifications.items.map((notification) =>
				notification.toObject(),
			),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { NotificationService };
