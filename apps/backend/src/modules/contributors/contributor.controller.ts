import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type ContributorService } from "./contributor.service.js";
import { ContributorsApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Contributor:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           minimum: 1
 *         name:
 *           type: string
 *         gitEmails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 minimum: 1
 *               email:
 *                 type: string
 *         projects:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 minimum: 1
 *               name:
 *                 type: string
 */
class ContributorController extends BaseController {
	private contributorService: ContributorService;

	public constructor(logger: Logger, contributorService: ContributorService) {
		super(logger, APIPath.CONTRIBUTORS);

		this.contributorService = contributorService;

		this.addRoute({
			handler: () => this.findAll(),
			method: "GET",
			path: ContributorsApiPath.ROOT,
		});
	}

	/**
	 * @swagger
	 * /contributors:
	 *   get:
	 *     description: Returns an array of contributors
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
	 *                     $ref: "#/components/schemas/Contributor"
	 */
	private async findAll(): Promise<APIHandlerResponse> {
		return {
			payload: await this.contributorService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { ContributorController };
