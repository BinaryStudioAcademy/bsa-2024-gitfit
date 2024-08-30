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
import {
	type UserPatchRequestDto,
	type UserPatchResponseDto,
} from "./libs/types/types.js";

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
			handler: () => this.findAll(),
			method: "GET",
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.patch(
					options as APIHandlerOptions<{
						body: UserPatchResponseDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: UsersApiPath.$ID,
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
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *    patch:
	 *      tags:
	 *        - Users
	 *      description: Update user info
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the user to update\
	 *          schema:
	 *            type: string
	 *      requestBody:
	 *        description: Updated user object\
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                name:
	 *                  type: string
	 *                email:
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
	 *                    $ref: "#/components/schemas/User"
	 */

	private async patch(
		options: APIHandlerOptions<{
			body: UserPatchRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const userId = Number(options.params.id);

		return {
			payload: await this.userService.patch(userId, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { UserController };
