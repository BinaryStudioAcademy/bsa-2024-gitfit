import { APIPath, PermissionKey } from "~/libs/enums/enums.js";
import { checkUserPermissions } from "~/libs/hooks/check-user-permissions.hook.js";
import {
	type APIHandlerOptions,
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
			handler: (options) =>
				this.findAll(
					options as APIHandlerOptions<{
						query: { projectId: string };
					}>,
				),
			method: "GET",
			path: ContributorsApiPath.ROOT,
			preHandlers: [
				checkUserPermissions([
					PermissionKey.VIEW_ALL_PROJECTS,
					PermissionKey.VIEW_PROJECT,
					PermissionKey.EDIT_PROJECT,
					PermissionKey.MANAGE_ALL_PROJECTS,
				]),
			],
		});
	}

	/**
	 * @swagger
	 * /contributors:
	 *   get:
	 *     description: Returns an array of contributors
	 *     parameters:
	 *       - name: projectId
	 *         in: query
	 *         description: Id of a project contributor should belong to
	 *         required: false
	 *         schema:
	 *           type: number
	 *           minimum: 1
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
	private async findAll(
		options: APIHandlerOptions<{
			query: { projectId?: string };
		}>,
	): Promise<APIHandlerResponse> {
		if (options.query.projectId) {
			const projectId = Number(options.query.projectId);

			return {
				payload: await this.contributorService.findAllByProjectId(projectId),
				status: HTTPCode.OK,
			};
		}

		return {
			payload: await this.contributorService.findAll(),
			status: HTTPCode.OK,
		};
	}
}

export { ContributorController };
