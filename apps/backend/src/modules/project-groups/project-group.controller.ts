import {
	APIPath,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { ProjectGroupsApiPath } from "./libs/enums/enums.js";
import { checkProjectGroupPermission } from "./libs/helpers/helpers.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllRequestDto,
	type ProjectGroupPatchRequestDto,
} from "./libs/types/types.js";
import {
	projectGroupCreateValidationSchema,
	projectGroupPatchValidationSchema,
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
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_USER_ACCESS, PermissionKey.MANAGE_ALL_PROJECTS],
					[ProjectPermissionKey.MANAGE_PROJECT],
					(options) =>
						Number(
							(
								options as APIHandlerOptions<{
									body: ProjectGroupCreateRequestDto;
								}>
							).body.projectId,
						),
				),
			],
			validation: {
				body: projectGroupCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.delete(options as APIHandlerOptions<{ params: { id: string } }>),
			method: "DELETE",
			path: ProjectGroupsApiPath.$ID,
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
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.MANAGE_USER_ACCESS, PermissionKey.MANAGE_ALL_PROJECTS],
					[ProjectPermissionKey.MANAGE_PROJECT],
					(options) =>
						Number(
							(
								options as APIHandlerOptions<{
									params: ProjectGroupGetAllRequestDto;
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
						body: ProjectGroupPatchRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: ProjectGroupsApiPath.$ID,
			validation: {
				body: projectGroupPatchValidationSchema,
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

	/**
	 * @swagger
	 * /project-groups/{id}:
	 *   delete:
	 *     description: Delete a project group by ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *       404:
	 *         description: Project group not found
	 */

	private async delete(
		options: APIHandlerOptions<{ params: { id: string } }>,
	): Promise<APIHandlerResponse> {
		const projectGroup = await this.projectGroupService.find(
			Number(options.params.id),
		);

		const projectGroupId = checkProjectGroupPermission({
			projectGroup,
			projectsPermissions: [ProjectPermissionKey.MANAGE_PROJECT],
			rootPermissions: [
				PermissionKey.MANAGE_USER_ACCESS,
				PermissionKey.MANAGE_ALL_PROJECTS,
			],
			user: options.user as UserAuthResponseDto,
		});

		return {
			payload: await this.projectGroupService.delete(projectGroupId),
			status: HTTPCode.OK,
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
	 *    patch:
	 *      tags:
	 *        - ProjectGroup
	 *      description: Patch project group info
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the project group to patch
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

	private async patch(
		options: APIHandlerOptions<{
			body: ProjectGroupPatchRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const projectGroup = await this.projectGroupService.find(
			Number(options.params.id),
		);

		const projectGroupId = checkProjectGroupPermission({
			projectGroup,
			projectsPermissions: [ProjectPermissionKey.MANAGE_PROJECT],
			rootPermissions: [
				PermissionKey.MANAGE_USER_ACCESS,
				PermissionKey.MANAGE_ALL_PROJECTS,
			],
			user: options.user as UserAuthResponseDto,
		});

		return {
			payload: await this.projectGroupService.patch(
				projectGroupId,
				options.body,
			),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectGroupController };
