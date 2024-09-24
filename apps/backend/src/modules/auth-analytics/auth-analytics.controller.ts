import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type AuthAnalyticsService } from "./auth-analytics.service.js";
import { AuthAnalyticsApiPath } from "./libs/enums/enums.js";
import { type AuthAnalyticsValidateCredentialsRequestDto } from "./libs/types/types.js";
import { authAnalyticsValidateCredentialsValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class AuthAnalyticsController extends BaseController {
	private authAnalyticsService: AuthAnalyticsService;

	public constructor(
		logger: Logger,
		authAnalyticsService: AuthAnalyticsService,
	) {
		super(logger, APIPath.AUTH_ANALYTICS);

		this.authAnalyticsService = authAnalyticsService;

		this.addRoute({
			handler: (options) =>
				this.validateCredentials(
					options as APIHandlerOptions<{
						body: AuthAnalyticsValidateCredentialsRequestDto;
						headers: Record<string, string | undefined>;
					}>,
				),
			method: "POST",
			path: AuthAnalyticsApiPath.ROOT,
			validation: {
				body: authAnalyticsValidateCredentialsValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /auth-analytics:
	 *   post:
	 *     description: Validate credentials for collecting statistics script
	 *     requestBody:
	 *       description: Collecting statistics script credentials
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               userId:
	 *                 type: number
	 *                 minimum: 1
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 projectId:
	 *                   type: number
	 *                 projectName:
	 *                   type: string
	 */

	private async validateCredentials(
		options: APIHandlerOptions<{
			body: AuthAnalyticsValidateCredentialsRequestDto;
			headers: Record<string, string | undefined>;
		}>,
	): Promise<APIHandlerResponse> {
		const authorizationHeader = options.headers["authorization"];
		const apiKey = authorizationHeader?.replace("Bearer ", "") ?? "";

		const payload = {
			apiKey,
			...options.body,
		};

		return {
			payload: await this.authAnalyticsService.validateCredentials(payload),
			status: HTTPCode.OK,
		};
	}
}

export { AuthAnalyticsController };
