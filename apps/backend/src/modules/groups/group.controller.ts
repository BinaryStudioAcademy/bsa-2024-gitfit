import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type GroupService } from "./group.service.js";
import { type GroupCreateRequestDto } from "./libs/types/types.js";
import { groupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
 *         name:
 *           type: string
 *           maxLength: 100
 *         userIds:
 *           type: array
 *           items:
 *             type: number
 *         permissionIds:
 *           type: array
 *           items:
 *             type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class GroupController extends BaseController {
	private groupService: GroupService;

	public constructor(logger: Logger, groupService: GroupService) {
		super(logger, APIPath.GROUPS);

		this.groupService = groupService;

		this.addRoute({
			handler: (options) =>
				this.createGroup(
					options as APIHandlerOptions<{ body: GroupCreateRequestDto }>,
				),
			method: "POST",
			path: "/",
			validation: {
				body: groupCreateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /groups:
	 *   post:
	 *     description: Create a new group and assign users and permissions
	 *     requestBody:
	 *       description: Payload for creating a group
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *               user_ids:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *               permission_ids:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *     responses:
	 *       201:
	 *         description: Group created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: number
	 *                 name:
	 *                   type: string
	 *                 permissionIds:
	 *                   type: array
	 *                   items:
	 *                     type: number
	 *                 userIds:
	 *                   type: array
	 *                   items:
	 *                     type: number
	 */

	private async createGroup(
		options: APIHandlerOptions<{ body: GroupCreateRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}
}

export { GroupController };
