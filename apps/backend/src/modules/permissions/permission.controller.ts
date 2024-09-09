import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { PermissionsApiPath } from "./libs/enums/enums.js";
import { type PermissionService } from "./permission.service.js";

class PermissionController extends BaseController {
	private permissionService: PermissionService;

	public constructor(logger: Logger, permissionService: PermissionService) {
		super(logger, APIPath.PERMISSIONS);

		this.permissionService = permissionService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: PermissionsApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /groups:
	 *   get:
	 *     description: Returns an array of permissions
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
	 *                     $ref: "#/components/schemas/Permission"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { PermissionController };
