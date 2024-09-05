import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { ProjectApiKeysApiPath } from "./libs/enums/enums.js";
import { type ProjectApiKeyCreateRequestDto } from "./libs/types/types.js";
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
 *         userId:
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
					}>,
				),
			method: "POST",
			path: ProjectApiKeysApiPath.ROOT,
			validation: {
				body: projectApiKeyCreateValidationSchema,
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
	 *                userId:
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
	 */
	private async create(
		options: APIHandlerOptions<{
			body: ProjectApiKeyCreateRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.projectApiKeyService.create(options.body),
			status: HTTPCode.CREATED,
		};
	}
}

export { ProjectApiKeyController };
