import {
	APIPath,
	PermissionKey,
	ProjectPermissionKey,
} from "~/libs/enums/enums.js";
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
	type ContributorGetAllQueryParameters,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorSplitRequestDto,
} from "./libs/types/types.js";
import {
	contributorGetAllValidationSchema,
	contributorMergeValidationSchema,
	contributorPatchValidationSchema,
	contributorSplitValidationSchema,
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
						query: ContributorGetAllQueryParameters;
					}>,
				),
			method: "GET",
			path: ContributorsApiPath.ROOT,
			preHandlers: [
				checkUserPermissions(
					[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_ALL_PROJECTS],
					[
						ProjectPermissionKey.VIEW_PROJECT,
						ProjectPermissionKey.EDIT_PROJECT,
						ProjectPermissionKey.MANAGE_PROJECT,
					],
					(options) =>
						Number(
							(
								options as APIHandlerOptions<{
									query: { projectId: string };
								}>
							).query.projectId,
						),
				),
			],
			validation: {
				query: contributorGetAllValidationSchema,
			},
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

		this.addRoute({
			handler: (options) =>
				this.split(
					options as APIHandlerOptions<{
						body: ContributorSplitRequestDto;
						params: { id: string };
					}>,
				),
			method: "PATCH",
			path: ContributorsApiPath.SPLIT_$ID,
			preHandlers: [checkUserPermissions([PermissionKey.MANAGE_ALL_PROJECTS])],
			validation: {
				body: contributorSplitValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /contributors:
	 *   get:
	 *     description: Returns an array of contributors with pagination
	 *     parameters:
	 *       - in: query
	 *         name: page
	 *         schema:
	 *           type: integer
	 *         description: The page number to retrieve
	 *         required: false
	 *       - in: query
	 *         name: pageSize
	 *         schema:
	 *           type: integer
	 *         description: Number of items per page
	 *         required: false
	 *       - name: projectId
	 *         in: query
	 *         description: Id of a project contributor should belong to
	 *         required: false
	 *         schema:
	 *           type: number
	 *           minimum: 1
	 *       - name: hasHidden
	 *         in: query
	 *         description: Determines whether include all contributors or tracked only
	 *         required: false
	 *         schema:
	 *           type: boolean
	 *       - name: contributorName
	 *         in: query
	 *         description: Contributor name search query
	 *         required: false
	 *         schema:
	 *           type: string
	 *       - name: orderBy
	 *         in: query
	 *         description: Field by which to sort contributors
	 *         required: false
	 *         schema:
	 *           type: string
	 *           enum: [created_at, last_activity_date]
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
			query: ContributorGetAllQueryParameters;
		}>,
	): Promise<APIHandlerResponse> {
		const { contributorName, hasHidden, orderBy, page, pageSize, projectId } =
			options.query;

		const query = {
			...(contributorName ? { contributorName } : {}),
			...(hasHidden ? { hasHidden: (hasHidden as unknown) === "true" } : {}),
			...(orderBy ? { orderBy } : {}),
			...(page ? { page: Number(page) } : {}),
			...(pageSize ? { pageSize: Number(pageSize) } : {}),
			...(projectId ? { projectId: Number(projectId) } : {}),
		};

		return {
			payload: await this.contributorService.findAll(query),
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
	 *         description: Attempt to self-merge or merging failed
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

	/**
	 * @swagger
	 * /contributors/split/{contributorId}:
	 *   patch:
	 *     description: Split contributors
	 *     parameters:
	 *       - name: contributorId
	 *         in: path
	 *         description: Id of the current contributor
	 *         required: true
	 *         schema:
	 *           type: number
	 *           minimum: 1
	 *     requestBody:
	 *       description: Payload for splitting contributors
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               gitEmailId:
	 *                 type: number
	 *               newContributorName:
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
	 *         description: Attempt to split single email or merging failed
	 */
	private async split(
		options: APIHandlerOptions<{
			body: ContributorSplitRequestDto;
			params: { id: string };
		}>,
	): Promise<APIHandlerResponse> {
		const contributorId = Number(options.params.id);

		return {
			payload: await this.contributorService.split(contributorId, options.body),
			status: HTTPCode.OK,
		};
	}
}

export { ContributorController };
