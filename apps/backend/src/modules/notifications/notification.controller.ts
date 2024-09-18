import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { NotificationsApiPath } from "./libs/enums/enums.js";
import {
	type NotificationBulkCreateRequestDto,
	type NotificationCreateRequestDto,
} from "./libs/types/types.js";
import {
	notificationBulkCreateValidationSchema,
	notificationCreateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type NotificationService } from "./notification.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         payload:
 *           type: string
 *           maxLength: 100
 *         receiverUserId:
 *           type: number
 *           minimum: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class NotificationController extends BaseController {
	private notificationService: NotificationService;

	public constructor(logger: Logger, notificationService: NotificationService) {
		super(logger, APIPath.NOTIFICATIONS);

		this.notificationService = notificationService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: NotificationsApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.bulkCreateNotifications(
					options as APIHandlerOptions<{
						body: NotificationBulkCreateRequestDto;
					}>,
				),
			method: "POST",
			path: NotificationsApiPath.BULK,
			preHandlers: [],
			validation: {
				body: notificationBulkCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.createNotification(
					options as APIHandlerOptions<{ body: NotificationCreateRequestDto }>,
				),
			method: "POST",
			path: NotificationsApiPath.ROOT,
			preHandlers: [],
			validation: {
				body: notificationCreateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /notifications/bulk:
	 *   post:
	 *     description: Create notifications for provided receiver user ids
	 *     requestBody:
	 *       description: Payload for creating notifications
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               payload:
	 *                 type: string
	 *               receiverUserId:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *     responses:
	 *       201:
	 *         description: Notification created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 items:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/Notification"
	 */

	private async bulkCreateNotifications(
		options: APIHandlerOptions<{ body: NotificationBulkCreateRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.bulkCreate(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /notifications:
	 *   post:
	 *     description: Create a new notification
	 *     requestBody:
	 *       description: Payload for creating a notification
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               payload:
	 *                 type: string
	 *               receiverUserId:
	 *                 type: number
	 *     responses:
	 *       201:
	 *         description: Notification created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: number
	 *                 payload:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 */

	private async createNotification(
		options: APIHandlerOptions<{ body: NotificationCreateRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /notifications:
	 *   get:
	 *     description: Returns an array of notifications
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 items:
	 *                   type: array
	 *                   items:
	 *                     $ref: "#/components/schemas/Notification"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.notificationService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { NotificationController };
