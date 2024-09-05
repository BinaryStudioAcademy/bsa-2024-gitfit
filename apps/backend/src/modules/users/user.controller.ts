import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserPatchRequestDto } from "./libs/types/types.js";
import { userPatchValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

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
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: PaginationQueryParameters;
					}>,
				),
			method: "GET",
			path: UsersApiPath.ROOT,
		});

		this.addRoute({
			handler: (options) =>
				this.patch(
					options as APIHandlerOptions<{
						body: UserPatchRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: UsersApiPath.$ID,
			validation: {
				body: userPatchValidationSchema,
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
			path: UsersApiPath.$ID,
		});
	}

	/**
	 * @swagger
	 * /users/{id}:
	 *    delete:
	 *      tags:
	 *        - Users
	 *      description: Deletes a user
	 *      parameters:
	 *        - in: path
	 *          name: id
	 *          description: ID of the user to delete
	 *          required: true
	 *          schema:
	 *            type: string
	 *      responses:
	 *        204:
	 *          description: User deleted successfully
	 */
	private async delete(
		options: APIHandlerOptions<{
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.delete(Number(options.params.id)),
			status: HTTPCode.NO_CONTENT,
		};
	}

	/**
	 * @swagger
	 * /users:
	 *    get:
	 *      description: Returns a paginated array of users
	 *      parameters:
	 *        - in: query
	 *          name: page
	 *          schema:
	 *            type: integer
	 *          description: Page number
	 *        - in: query
	 *          name: pageSize
	 *          schema:
	 *            type: integer
	 *          description: Number of items per page
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
	 *                      $ref: "#/components/schemas/User"
	 *                  currentPage:
	 *                    type: integer
	 *                  totalItems:
	 *                    type: integer
	 *                  totalPages:
	 *                    type: integer
	 */

	private async findAll({
		query,
	}: APIHandlerOptions<{
		query: PaginationQueryParameters;
	}>): Promise<APIHandlerResponse> {
		return {
			payload: await this.userService.findAll(query),
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
