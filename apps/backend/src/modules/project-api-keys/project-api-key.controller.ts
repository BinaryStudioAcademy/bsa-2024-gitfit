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
	type ProjectApiKeyPatchRequestDto,
	type UserAuthResponseDto,
} from "./libs/types/types.js";
import {
	projectApiKeyCreateValidationSchema,
	projectApiKeyPatchValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
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
				this.patch(
					options as APIHandlerOptions<{
						body: ProjectApiKeyCreateRequestDto;
						user: UserAuthResponseDto;
					}>,
				),
			method: "PATCH",
			path: ProjectApiKeysApiPath.ROOT,
			validation: {
				body: projectApiKeyPatchValidationSchema,
			},
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
	 * /project-api-keys/regenerate:
	 *    patch:
	 *      description: Regenerates the API key for the specified project
	 *      requestBody:
	 *        description: Project ID for which to regenerate the API key
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
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/ProjectApiKey"
	 *        404:
	 *          description: Project not found or API key not found
	 */
	private async patch(
		options: APIHandlerOptions<{
			body: ProjectApiKeyPatchRequestDto;
			user: UserAuthResponseDto;
		}>,
	): Promise<APIHandlerResponse> {
		const payload = {
			...options.body,
			userId: options.user.id,
		};

		return {
			payload: await this.projectApiKeyService.patch(payload),
			status: HTTPCode.OK,
		};
	}
}

export { ProjectApiKeyController };
