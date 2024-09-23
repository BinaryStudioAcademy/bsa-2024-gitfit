import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import { NotificationsApiPath } from "./libs/enums/enums.js";
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
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: PaginationQueryParameters;
					}>,
				),
			method: "GET",
			path: NotificationsApiPath.ROOT,
		});
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
	private async findAll({
		query,
		user,
	}: APIHandlerOptions<{
		query: PaginationQueryParameters;
	}>): Promise<APIHandlerResponse> {
		const typedUser = user as { id: number };

		return {
			payload: await this.notificationService.findAll({
				...query,
				userId: typedUser.id,
			}),
			status: HTTPCode.OK,
		};
	}
}
export { NotificationController };
