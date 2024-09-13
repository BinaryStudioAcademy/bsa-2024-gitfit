import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { ProjectApiKeysApiPath } from "./libs/enums/enums.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
import { projectApiKeyCreateValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
import { type ProjectApiKeyService } from "./project-api-key.service.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectApiKey:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         apiKey:
 *           type: string
 *         projectId:
 *           type: number
 *           minimum: 1
 *         createdByUserId:
 *           type: number
 *           minimum: 1
 *         updatedByUserId:
 *           type: number
 *           minimum: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class ProjectApiKeyController extends BaseController {
	private projectApiKeyService: ProjectApiKeyService;

	public constructor(
		logger: Logger,
		projectApiKeyService: ProjectApiKeyService,
	) {
		super(logger, APIPath.PROJECT_API_KEYS);

		this.projectApiKeyService = projectApiKeyService;

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: ProjectApiKeyCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "POST",
			path: ProjectApiKeysApiPath.ROOT,
			validation: {
				body: projectApiKeyCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.delete(
					options as APIHandlerOptions<{
						params: { projectId: string };
					}>,
				),
			method: "DELETE",
			path: ProjectApiKeysApiPath.$ID,
		});
	}

	/**
	 * @swagger
	 * /project-api-keys:
	 *    post:
	 *      description: Generates and adds project api key into the system
	 *      requestBody:
	 *        description: Project api key data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                projectId:
	 *                  type: number
	 *                  minimum: 1
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/ProjectApiKey"
	 *        409:
	 *          description: The project already has API key
	 *        404:
	 *          description: Either user or project not found
	 */
	private async create(
		options: APIHandlerOptions<{
			body: ProjectApiKeyCreateRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const payload = {
			...options.body,
			userId: options.user.id,
		};

		return {
			payload: await this.projectApiKeyService.create(payload),
			status: HTTPCode.CREATED,
		};
	}
	/**
	 * @swagger
	 * /project-api-keys/{id}:
	 *   delete:
	 *     description: Deletes an API key for a specific project.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         description: ID of the project for which the API key should be deleted
	 *         schema:
	 *           type: number
	 *           minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successfully deleted the API key
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *               example: true
	 *       404:
	 *         description: Project not found or no API key to delete
	 *         content:
	 */
	private async delete(
		options: APIHandlerOptions<{
			params: { projectId: string };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectApiKeyService.delete(
				Number(options.params.projectId),
			),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectApiKeyController };
