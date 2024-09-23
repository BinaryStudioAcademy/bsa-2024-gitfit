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
import {
	type ActivityLogCreateRequestDto,
	type ActivityLogQueryParameters,
} from "./libs/types/types.js";
import {
	activityLogCreateValidationSchema,
	activityLogGetValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
 *         ptojectId :
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
						headers: Record<string, string | undefined>;
					}>,
				),
			method: "POST",
			path: ActivityLogsApiPath.ROOT,
			validation: {
				body: activityLogCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: ActivityLogQueryParameters;
					}>,
				),
			method: "GET",
			path: ActivityLogsApiPath.ROOT,
			validation: {
				query: activityLogGetValidationSchema,
			},
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
	 *             type: object
	 *             properties:
	 *               items:
	 *                 type: array
	 *                 items:
	 *                   type: object
	 *                   properties:
	 *                     authorEmail:
	 *                       type: string
	 *                     authorName:
	 *                       type: string
	 *                     commitsNumber:
	 *                       type: integer
	 *               date:
	 *                 type: string
	 *                 format: date-time
	 *     responses:
	 *       201:
	 *         description: Activity log saved successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/ActivityLog'
	 */

	private async create(
		options: APIHandlerOptions<{
			body: ActivityLogCreateRequestDto;
			headers: Record<string, string | undefined>;
		}>,
	): Promise<APIHandlerResponse> {
		const authorizationHeader = options.headers["authorization"];
		const apiKey = authorizationHeader?.replace("Bearer ", "") ?? "";

		const payload = {
			apiKey,
			...options.body,
		};

		return {
			payload: await this.activityLogService.create(payload),
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
	private async findAll(
		options: APIHandlerOptions<{
			query: ActivityLogQueryParameters;
		}>,
	): Promise<APIHandlerResponse> {
		const { contributorName, endDate, startDate } = options.query;

		return {
			payload: await this.activityLogService.findAll({
				contributorName,
				endDate,
				startDate,
			}),
			status: HTTPCode.OK,
		};
	}
}

export { ActivityLogController };
