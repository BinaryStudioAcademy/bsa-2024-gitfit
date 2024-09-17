import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { ProjectPermissionsApiPath } from "./libs/enums/enums.js";
import { type ProjectPermissionService } from "./project-permissions.service.js";

class ProjectPermissionsController extends BaseController {
	private projectPermissionService: ProjectPermissionService;

	public constructor(
		logger: Logger,
		projectPermissionService: ProjectPermissionService,
	) {
		super(logger, APIPath.PROJECT_PERMISSIONS);

		this.projectPermissionService = projectPermissionService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: ProjectPermissionsApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /project-groups:
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
	 *                     $ref: "#/components/schemas/Project-permission"
	 */

	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectPermissionService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectPermissionsController };
