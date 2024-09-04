import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserAuthResponseDto } from "~/modules/users/libs/types/types.js";

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

		this.addRoute({
			handler: (options) =>
				this.getPermissions(
					options as APIHandlerOptions<{
						user: UserAuthResponseDto;
					}>,
				),
			method: "GET",
			path: PermissionsApiPath.USER_PERMISSONS,
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
		const permissions = await this.permissionService.findAll();

		return {
			payload: permissions,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/permissions:
	 *    get:
	 *      description: Get permissions for the authenticated user
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  type: object
	 *                  properties:
	 *                    id:
	 *                      type: integer
	 *                    key:
	 *                      type: string
	 *                    name:
	 *                      type: string
	 *                    createdAt:
	 *                      type: string
	 *                      format: date-time
	 *                    updatedAt:
	 *                      type: string
	 *                      format: date-time
	 */

	private async getPermissions(
		options: APIHandlerOptions<{
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.permissionService.getPermissions(options.user.id),
			status: HTTPCode.OK,
		};
	}
}

export { PermissionController };
