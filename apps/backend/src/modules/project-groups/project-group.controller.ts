import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import { ProjectGroupsApiPath } from "./libs/enums/enums.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllRequestDto,
	type ProjectGroupUpdateRequestDto,
} from "./libs/types/types.js";
import {
	projectGroupCreateValidationSchema,
	projectGroupUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
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

		this.addRoute({
			handler: (options) =>
				this.findAllByProjectId(
					options as APIHandlerOptions<{
						params: ProjectGroupGetAllRequestDto;
						query: PaginationQueryParameters;
					}>,
				),
			method: "GET",
			path: ProjectGroupsApiPath.$ID,
		});

		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: ProjectGroupUpdateRequestDto;
						params: { id: string };
					}>,
				),
			method: "PUT",
			path: ProjectGroupsApiPath.$ID,
			validation: {
				body: projectGroupUpdateValidationSchema,
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

	private async findAllByProjectId(
		options: APIHandlerOptions<{
			params: ProjectGroupGetAllRequestDto;
			query: PaginationQueryParameters;
		}>,
	): Promise<APIHandlerResponse> {
		const { params, query } = options;

		return {
			payload: await this.projectGroupService.findAllByProjectId(
				params.id,
				query,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{id}:
	 *    update:
	 *      tags:
	 *        - ProjectGroup
	 *      description: Update project group info
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the project group to update
	 *          schema:
	 *            type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/ProjectGroup"
	 */

	private async update(
		options: APIHandlerOptions<{
			body: ProjectGroupUpdateRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const projectGroupId = Number(options.params.id);

		return {
			payload: await this.projectGroupService.update(
				projectGroupId,
				options.body,
			),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectGroupController };
