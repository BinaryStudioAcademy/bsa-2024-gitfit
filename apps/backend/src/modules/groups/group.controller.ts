import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { groupCreateValidationSchema } from "~/modules/groups/groups.js";

import { type GroupService } from "./group.service.js";
import { type GroupCreateRequestDto } from "./libs/types/types.js";

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
			path: "/create",
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
	 *       500:
	 *         description: Failed to create group
	 */

	private async createGroup(
		options: APIHandlerOptions<{ body: GroupCreateRequestDto }>,
	): Promise<APIHandlerResponse> {
		await this.groupService.create(options.body);

		return {
			payload: { message: "Group created successfully" },
			status: HTTPCode.CREATED,
		};
	}
}

export { GroupController };
