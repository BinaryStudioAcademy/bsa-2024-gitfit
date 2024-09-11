import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type ActivityLogService } from "./activity-log.service.js";
import { ActivityLogsApiPath } from "./libs/enums/enums.js";
import { type ActivityLogCreateRequestDto } from "./libs/types/types.js";
import { activityLogCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityLog:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         commitsNumber:
 *           type: number
 *           minimum: 1
 *         createdByUserId:
 *           type: number
 *           minimum: 1
 *         date:
 *           type: string
 *           format: date-time
 *         gitEmailId:
 *           type: number
 *           minimum: 1
 *         ptojectId:
 *           type: number
 *           minimum: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class ActivityLogController extends BaseController {
	private activityLogService: ActivityLogService;

	public constructor(logger: Logger, activityLogService: ActivityLogService) {
		super(logger, APIPath.ACTIVITY_LOGS);

		this.activityLogService = activityLogService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ActivityLogCreateRequestDto;
					}>,
				),
			method: "POST",
			path: ActivityLogsApiPath.SAVE,
			validation: {
				body: activityLogCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: ActivityLogsApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /activity-logs:
	 *   post:
	 *     description: Save new activity logs
	 *     requestBody:
	 *       description: Payload for saving activity logs
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *       		type: object
	 *       		properties:
	 *         			items:
	 *           			type: array
	 * 						date:
	 * 							type: string
	 * 							format: date-time
	 *         				items:
	 *           				type: array
	 *           			items:
	 *            				 type: object
	 *            				 properties:
	 *              				 authorEmail:
	 *                 					type: string
	 *               				 authorName:
	 *                					type: string
	 *              				 commitsNumber:
	 *                					type: number
	 *                 					format: integer
	 *     responses:
	 *       201:
	 *         description: Activity log saved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *              $ref: '#/components/schemas/ActivityLog'
	 */

	private async create(
		options: APIHandlerOptions<{
			body: ActivityLogCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.activityLogService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /activity-logs:
	 *   get:
	 *     description: Returns an array of activity logs
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
	 *                     $ref: "#/components/schemas/ActivityLog"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		const activityLogs = await this.activityLogService.findAll();

		return {
			payload: activityLogs,
			status: HTTPCode.OK,
		};
	}
}

export { ActivityLogController };
