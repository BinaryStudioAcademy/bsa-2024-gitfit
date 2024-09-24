import { SortType } from "~/libs/enums/enums.js";
import {
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";

import { NotificationStatus } from "./libs/enums/enums.js";
import { type NotificationGetAllRequestDto } from "./libs/types/types.js";
import { NotificationEntity } from "./notification.entity.js";
import { type NotificationModel } from "./notification.model.js";

class NotificationRepository implements Repository {
	private notificationModel: typeof NotificationModel;

	public constructor(notificationModel: typeof NotificationModel) {
		this.notificationModel = notificationModel;
	}

	public async bulkCreate(
		entities: NotificationEntity[],
	): Promise<NotificationEntity[]> {
		const notificationsData = entities.map((entity) => {
			const { payload, receiverUserId } = entity.toNewObject();

			return { payload, receiverUserId };
		});

		const createdNotifications = await this.notificationModel
			.query()
			.insertGraph(notificationsData, { relate: true })
			.returning("*")
			.execute();

		return createdNotifications.map((notificationData) =>
			NotificationEntity.initialize(notificationData),
		);
	}

	public async create(entity: NotificationEntity): Promise<NotificationEntity> {
		const { payload, receiverUserId } = entity.toNewObject();

		const notificationData = {
			payload,
			receiverUserId,
		};

		const createdNotification = await this.notificationModel
			.query()
			.insertGraph(notificationData, { relate: true })
			.returning("*")
			.execute();

		return NotificationEntity.initialize(createdNotification);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll({
		page,
		pageSize,
		userId,
	}: NotificationGetAllRequestDto): Promise<
		PaginationResponseDto<NotificationEntity>
	> {
		const { results, total } = await this.notificationModel
			.query()
			.where("receiverUserId", userId)
			.orderBy("created_at", SortType.DESCENDING)
			.page(page, pageSize)
			.execute();

		return {
			items: results.map((notification) =>
				NotificationEntity.initialize(notification),
			),
			totalItems: total,
		};
	}

	public async findAllUnread(
		userId: number,
	): Promise<{ items: NotificationEntity[] }> {
		const notifications = await this.notificationModel
			.query()
			.where("receiverUserId", userId)
			.where("status", NotificationStatus.UNREAD)
			.orderBy("created_at", SortType.DESCENDING)
			.execute();

		return {
			items: notifications.map((notification) =>
				NotificationEntity.initialize(notification),
			),
		};
	}

	public async markAsRead(id: number): Promise<boolean> {
		const readNotification = await this.notificationModel
			.query()
			.patchAndFetchById(id, {
				status: NotificationStatus.READ,
			})
			.execute();

		return Boolean(readNotification);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { NotificationRepository };
