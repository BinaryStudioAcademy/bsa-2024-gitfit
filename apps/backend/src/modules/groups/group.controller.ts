import { APIPath, PermissionKey } from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/hooks.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import { type GroupService } from "./group.service.js";
import { GroupsApiPath } from "./libs/enums/enum.js";
import {
	type GroupCreateRequestDto,
	type GroupUpdateRequestDto,
} from "./libs/types/types.js";
import {
	groupCreateValidationSchema,
	groupUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
			path: GroupsApiPath.ROOT,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_USER_ACCESS])],
			validation: {
				body: groupCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.deleteGroup(
					options as APIHandlerOptions<{ params: { id: string } }>,
				),
			method: "DELETE",
			path: GroupsApiPath.$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_USER_ACCESS])],
		});

		this.addRoute({
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: PaginationQueryParameters;
					}>,
				),
			method: "GET",
			path: GroupsApiPath.ROOT,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_USER_ACCESS])],
		});

		this.addRoute({
			handler: (options) =>
				this.update(
					options as APIHandlerOptions<{
						body: GroupUpdateRequestDto;
						params: { id: string };
					}>,
				),
			method: "PUT",
			path: GroupsApiPath.$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_USER_ACCESS])],
			validation: {
				body: groupUpdateValidationSchema,
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
	 *               userIds:
	 *                 type: array
	 *                 items:
	 *                   type: number
	 *               permissionIds:
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

	/**
	 * @swagger
	 * /groups/{id}:
	 *   delete:
	 *     description: Delete a group by ID
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
	 *         description: Group not found
	 */

	private async deleteGroup(
		options: APIHandlerOptions<{ params: { id: string } }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.delete(Number(options.params.id)),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups:
	 *   get:
	 *     description: Returns an array of groups with pagination
	 *     parameters:
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: integer
	 *         description: The page number to retrieve
	 *       - in: query
	 *         name: pageSize
	 *         schema:
	 *           type: integer
	 *         description: Number of items per page
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
	 *                     $ref: "#/components/schemas/Group"
	 *                 totalItems:
	 *                   type: integer
	 *                   description: Total number of groups available
	 */
	private async findAll({
		query,
	}: APIHandlerOptions<{
		query: PaginationQueryParameters;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.groupService.findAll(query),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /groups/{id}:
	 *    update:
	 *      tags:
	 *        - Groups
	 *      description: Update group info
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the group to update
	 *          schema:
	 *            type: string
	 *      requestBody:
	 *        description: Updated group object
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
	 *                    $ref: "#/components/schemas/Group"
	 */

	private async update(
		options: APIHandlerOptions<{
			body: GroupUpdateRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const groupId = Number(options.params.id);

		return {
			payload: await this.groupService.update(groupId, options.body),
			status: HTTPCode.OK,
		};
	}
}
export { GroupController };
