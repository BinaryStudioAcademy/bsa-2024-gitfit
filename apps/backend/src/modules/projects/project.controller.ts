import {
	APIPath,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type PermissionGetAllItemResponseDto } from "../permissions/libs/types/types.js";
import { type ProjectGroupService } from "../project-groups/project-groups.js";
import { type UserAuthResponseDto } from "../users/users.js";
import { ProjectsApiPath } from "./libs/enums/enums.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllRequestDto,
	type ProjectPatchRequestDto,
} from "./libs/types/types.js";
import {
	projectCreateValidationSchema,
	projectPatchValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { type ProjectService } from "./project.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         name:
 *           type: string
 *           maxLength: 50
 *         description:
 *           type: string
 *           maxLength: 1000
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class ProjectController extends BaseController {
	private projectGroupService: ProjectGroupService;
	private projectService: ProjectService;

	public constructor(
		logger: Logger,
		projectGroupService: ProjectGroupService,
		projectService: ProjectService,
	) {
		super(logger, APIPath.PROJECTS);

		this.projectGroupService = projectGroupService;
		this.projectService = projectService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ProjectCreateRequestDto;
					}>,
				),
			method: "POST",
			path: ProjectsApiPath.ROOT,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_ALL_PROJECTS])],
			validation: {
				body: projectCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.delete(
					options as APIHandlerOptions<{
						params: { id: string };
					}>,
				),
			method: "DELETE",
			path: ProjectsApiPath.$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_ALL_PROJECTS])],
		});

		this.addRoute({
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: ProjectGetAllRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: ProjectsApiPath.ROOT,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_ALL_PROJECTS],
					[
						ProjectPermissionKey.VIEW_PROJECT,
						ProjectPermissionKey.EDIT_PROJECT,
						ProjectPermissionKey.MANAGE_PROJECT,
					],
				),
			],
		});

		this.addRoute({
			handler: (options) =>
				this.getById(
					options as APIHandlerOptions<{
						params: { id: string };
					}>,
				),
			method: "GET",
			path: ProjectsApiPath.$ID,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_ALL_PROJECTS],
					[
						ProjectPermissionKey.VIEW_PROJECT,
						ProjectPermissionKey.EDIT_PROJECT,
						ProjectPermissionKey.MANAGE_PROJECT,
					],
					(options) =>
						Number(
							(
								options as APIHandlerOptions<{
									params: { id: string };
								}>
							).params.id,
						),
				),
			],
		});

		this.addRoute({
			handler: (options) =>
				this.patch(
					options as APIHandlerOptions<{
						body: ProjectPatchRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: ProjectsApiPath.$ID,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_ALL_PROJECTS],
					[
						ProjectPermissionKey.EDIT_PROJECT,
						ProjectPermissionKey.MANAGE_PROJECT,
					],
					(options) =>
						Number(
							(
								options as APIHandlerOptions<{
									params: { id: string };
								}>
							).params.id,
						),
				),
			],
			validation: {
				body: projectPatchValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /projects:
	 *    post:
	 *      description: Add project into the system
	 *      requestBody:
	 *        description: Project data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *                description:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Project was successfully created
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/Project"
	 */
	private async create(
		options: APIHandlerOptions<{
			body: ProjectCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}

	/**
	 * @swagger
	 * /projects/{id}:
	 *    delete:
	 *      description: Deletes project by ID
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          schema:
	 *            type: integer
	 *          required: true
	 *          description: Numeric ID of the project to be deleted
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: boolean
	 */
	private async delete(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectService.delete(Number(options.params.id)),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /projects:
	 *    get:
	 *      description: Returns all projects or filters them by name if the 'name' query parameter is provided.
	 *      parameters:
	 *        - in: query
	 *          name: name
	 *          schema:
	 *            type: string
	 *          description: The name to filter projects by (optional).
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  items:
	 *                    type: array
	 *                    items:
	 *                      $ref: "#/components/schemas/Project"
	 */
	private async findAll(
		options: APIHandlerOptions<{
			query: ProjectGetAllRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { name, page, pageSize } = options.query;
		const { user } = options;

		const groups = await this.projectGroupService.findAllByUserId(user.id);

		const rootPermissions: PermissionGetAllItemResponseDto[] =
			user.groups.flatMap((group) =>
				group.permissions.map((permission) => ({
					id: permission.id,
					key: permission.key,
					name: permission.name,
				})),
			);

		const hasRootPermission = checkHasPermission(
			[PermissionKey.MANAGE_ALL_PROJECTS, PermissionKey.VIEW_ALL_PROJECTS],
			rootPermissions,
		);

		const userProjectIds = hasRootPermission
			? []
			: groups.map(({ projectId }) => projectId.id);

		if (page && pageSize) {
			return {
				payload: await this.projectService.findAll({
					hasRootPermission,
					parameters: {
						name,
						page: Number(page),
						pageSize: Number(pageSize),
					},
					userProjectIds,
				}),
				status: HTTPCode.OK,
			};
		}

		return {
			payload: await this.projectService.findAllWithoutPagination({
				userProjectIds,
			}),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /projects/{id}:
	 *    get:
	 *      description: Get project by ID
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          schema:
	 *            type: integer
	 *          required: true
	 *          description: Numeric ID of the project to retrieve
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
	 *                    $ref: "#/components/schemas/Project"
	 */
	private async getById(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectService.find(Number(options.params.id)),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /projects/{id}:
	 *    patch:
	 *      description: Update project info
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          required: true
	 *          description: The ID of the project to update
	 *          schema:
	 *            type: integer
	 *      requestBody:
	 *        description: Project data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *                description:
	 *                  type: string
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
	 *                    $ref: "#/components/schemas/Project"
	 */

	private async patch(
		options: APIHandlerOptions<{
			body: ProjectPatchRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const projectId = Number(options.params.id);

		return {
			payload: await this.projectService.patch(projectId, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectController };
