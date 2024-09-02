import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { ProjectGroupsApiPath } from "./libs/enums/enums.js";
import { type ProjectGroupCreateRequestDto } from "./libs/types/types.js";
import { projectGroupCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type ProjectGroupService } from "./project-group.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectGroup:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         name:
 *           type: string
 *           maxLength: 100
 *         permissionIds:
 *           type: array
 *           items:
 *             type: number
 *         projectId:
 *           type: number
 *           minimum: 1
 *         userIds:
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

class ProjectGroupController extends BaseController {
	private projectGroupService: ProjectGroupService;

	public constructor(logger: Logger, projectGroupService: ProjectGroupService) {
		super(logger, APIPath.PROJECT_GROUPS);

		this.projectGroupService = projectGroupService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ProjectGroupCreateRequestDto;
					}>,
				),
			method: "POST",
			path: ProjectGroupsApiPath.ROOT,
			validation: {
				body: projectGroupCreateValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /project-groups:
	 *   post:
	 *     description: Create a new project group
	 *     requestBody:
	 *       description: Payload for creating a project group
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *               permissionIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *               projectId:
	 *                 type: number
	 *                 minimum: 1
	 *               userIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *     responses:
	 *       201:
	 *         description: Project Group created successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 id:
	 *                   type: number
	 *               name:
	 *                 type: string
	 *               permissionIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *               projectId:
	 *                 type: number
	 *                 minimum: 1
	 *               userIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 */

	private async create(
		options: APIHandlerOptions<{
			body: ProjectGroupCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectGroupService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}
}

export { ProjectGroupController };
