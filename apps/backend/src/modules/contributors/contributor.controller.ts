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
import {
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
} from "./libs/types/types.js";
import {
	contributorMergeValidationSchema,
	contributorPatchValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";

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
					PermissionKey.MANAGE_ALL_PROJECTS,
				]),
			],
		});

		this.addRoute({
			handler: (options) =>
				this.merge(
					options as APIHandlerOptions<{
						body: ContributorMergeRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: ContributorsApiPath.MERGE_$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_ALL_PROJECTS])],
			validation: {
				body: contributorMergeValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.patch(
					options as APIHandlerOptions<{
						body: ContributorPatchRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: ContributorsApiPath.$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_ALL_PROJECTS])],
			validation: {
				body: contributorPatchValidationSchema,
			},
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

	/**
	 * @swagger
	 * /contributors/merge/{contributorId}:
	 *   patch:
	 *     description: Merge contributors
	 *     parameters:
	 *       - name: contributorId
	 *         in: path
	 *         description: Id of the current contributor
	 *         required: true
	 *         schema:
	 *           type: number
	 *           minimum: 1
	 *     requestBody:
	 *       description: Payload for merging contributors
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               currentContributorId:
	 *                 type: number
	 *               selectedContributorId:
	 *                 type: number
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 items:
	 *                   type: object
	 *                   $ref: "#/components/schemas/Contributor"
	 *       404:
	 *         description: Contributor not found
	 *       409:
	 *         description: Attept to self-merge or merging failed
	 */
	private async merge(
		options: APIHandlerOptions<{
			body: ContributorMergeRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const contributorId = Number(options.params.id);

		return {
			payload: await this.contributorService.merge(contributorId, options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /contributors/{contributorId}:
	 *   patch:
	 *     description: Updates contributor information
	 *     parameters:
	 *       - name: contributorId
	 *         in: path
	 *         description: Id of the contributor to update
	 *         required: true
	 *         schema:
	 *           type: number
	 *           minimum: 1
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Contributor updated successfully
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/Contributor"
	 *       404:
	 *         description: Contributor not found
	 */
	private async patch(
		options: APIHandlerOptions<{
			body: ContributorPatchRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const contributorId = Number(options.params.id);

		return {
			payload: await this.contributorService.patch(contributorId, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { ContributorController };
