import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type PaginationParameters } from "./libs/types/types.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */

class UserController extends BaseController {
	private userService: UserService;

	public constructor(logger: Logger, userService: UserService) {
		super(logger, APIPath.USERS);

		this.userService = userService;

		this.addRoute({
			handler: (request) => this.findAll(request),
			method: "GET",
			path: UsersApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Returns an array of users
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: array
	 *                items:
	 *                  $ref: "#/components/schemas/User"
	 */
	private async findAll({
		query,
	}: APIHandlerOptions): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(query as PaginationParameters),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
