import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import {
	formatDate,
	getDateRange,
	getEndOfDay,
	getStartOfDay,
} from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ContributorService } from "~/modules/contributors/contributors.js";
import { type GitEmailService } from "~/modules/git-emails/git-emails.js";
import { type ProjectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";
import { type ProjectService } from "~/modules/projects/project.service.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogRepository } from "./activity-log.repository.js";
import { ActivityLogError } from "./libs/exceptions/exceptions.js";
import {
	type ActivityLogCreateItemResponseDto,
	type ActivityLogCreateRequestDto,
	type ActivityLogGetAllAnalyticsResponseDto,
	type ActivityLogGetAllResponseDto,
	type ActivityLogQueryParameters,
} from "./libs/types/types.js";

type Constructor = {
	activityLogRepository: ActivityLogRepository;
	contributorService: ContributorService;
	gitEmailService: GitEmailService;
	projectApiKeyService: ProjectApiKeyService;
	projectService: ProjectService;
};

class ActivityLogService implements Service {
	private activityLogRepository: ActivityLogRepository;
	private contributorService: ContributorService;
	private gitEmailService: GitEmailService;
	private projectApiKeyService: ProjectApiKeyService;
	private projectService: ProjectService;

	public constructor({
		activityLogRepository,
		contributorService,
		gitEmailService,
		projectApiKeyService,
		projectService,
	}: Constructor) {
		this.activityLogRepository = activityLogRepository;
		this.contributorService = contributorService;
		this.gitEmailService = gitEmailService;
		this.projectApiKeyService = projectApiKeyService;
		this.projectService = projectService;
	}

	private async createActivityLog({
		date,
		logItem,
		projectId,
		userId,
	}: ActivityLogCreateItemResponseDto): Promise<ActivityLogEntity> {
		const { authorEmail, authorName, commitsNumber } = logItem;

		let gitEmail = await this.gitEmailService.findByEmail(authorEmail);

		if (!gitEmail) {
			const contributor = await this.contributorService.create({
				name: authorName,
			});

			gitEmail = await this.gitEmailService.create({
				contributorId: contributor.id,
				email: authorEmail,
			});
		}

		try {
			return await this.activityLogRepository.create(
				ActivityLogEntity.initializeNew({
					commitsNumber,
					createdByUser: { id: userId },
					date,
					gitEmail: { contributor: gitEmail.contributor, id: gitEmail.id },
					project: { id: projectId },
				}),
			);
		} catch {
			throw new ActivityLogError({
				message: ExceptionMessage.ACTIVITY_LOG_CREATE_FAILED,
				status: HTTPCode.FORBIDDEN,
			});
		}
	}

	public async create(
		payload: { apiKey: string } & ActivityLogCreateRequestDto,
	): Promise<ActivityLogGetAllResponseDto> {
		const { apiKey, items, userId } = payload;

		const existingProjectApiKey =
			await this.projectApiKeyService.findByApiKey(apiKey);

		const { projectId } = existingProjectApiKey;

		const createdActivityLogs: ActivityLogGetAllResponseDto = {
			items: [],
		};

		for (const record of items) {
			const { date, items } = record;

			for (const logItem of items) {
				const activityLog = await this.createActivityLog({
					date,
					logItem,
					projectId,
					userId,
				});

				createdActivityLogs.items.push(activityLog.toObject());
			}

			if (items.length > EMPTY_LENGTH) {
				await this.projectService.updateLastActivityDate(projectId, date);
			}
		}

		return createdActivityLogs;
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll({
		contributorName,
		endDate,
		hasRootPermission,
		projectId,
		startDate,
		userProjectIds,
	}: {
		hasRootPermission: boolean;
		userProjectIds: number[];
	} & ActivityLogQueryParameters): Promise<ActivityLogGetAllAnalyticsResponseDto> {
		const projectIdParsed = projectId ? Number(projectId) : undefined;

		let permittedProjectIds: number[];

		if (projectIdParsed) {
			if (!hasRootPermission && !userProjectIds.includes(projectIdParsed)) {
				throw new ActivityLogError({
					message: ExceptionMessage.NO_PERMISSION,
					status: HTTPCode.FORBIDDEN,
				});
			}

			permittedProjectIds = [projectIdParsed];
		} else if (hasRootPermission) {
			permittedProjectIds = [];
		} else {
			permittedProjectIds = userProjectIds;
		}

		const formattedStartDate = formatDate(
			getStartOfDay(new Date(startDate)),
			"yyyy-MM-dd",
		);

		const formattedEndDate = formatDate(
			getEndOfDay(new Date(endDate)),
			"yyyy-MM-dd",
		);

		const activityLogsEntities = await this.activityLogRepository.findAll({
			contributorName,
			endDate: formattedEndDate,
			permittedProjectIds,
			projectId,
			startDate: formattedStartDate,
		});

		const activityLogs = activityLogsEntities.items.map((item) =>
			item.toObject(),
		);

		const allContributors = await this.contributorService.findAll({
			contributorName,
			permittedProjectIds,
			projectId,
		});

		const dateRange = getDateRange(formattedStartDate, formattedEndDate);

		const INITIAL_COMMITS_NUMBER = 0;
		const contributorMap: Record<string, number[]> = {};

		for (const contributor of allContributors.items) {
			const uniqueKey = `${contributor.name}_${String(contributor.id)}`;
			contributorMap[uniqueKey] = Array.from(
				{ length: dateRange.length },
				() => INITIAL_COMMITS_NUMBER,
			);
		}

		for (const log of activityLogs) {
			const { commitsNumber, date, gitEmail } = log;
			const { id, name } = gitEmail.contributor;

			const uniqueKey = `${name}_${String(id)}`;
			const formattedDate = formatDate(new Date(date), "MMM d");
			const dateIndex = dateRange.indexOf(formattedDate);

			if (contributorMap[uniqueKey]) {
				const currentValue =
					contributorMap[uniqueKey][dateIndex] ?? INITIAL_COMMITS_NUMBER;
				contributorMap[uniqueKey][dateIndex] = currentValue + commitsNumber;
			}
		}

		return {
			items: Object.entries(contributorMap).map(([uniqueKey, commitsArray]) => {
				const [contributorName, contributorId] = uniqueKey.split("_");

				return {
					commitsNumber: commitsArray,
					contributor: {
						hiddenAt: null,
						id: contributorId as string,
						name: contributorName as string,
					},
				};
			}),
		};
	}

	public async findAllWithoutFilter(): Promise<ActivityLogGetAllResponseDto> {
		const activityLogs =
			await this.activityLogRepository.findAllWithoutFilter();

		return {
			items: activityLogs.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ActivityLogService };
