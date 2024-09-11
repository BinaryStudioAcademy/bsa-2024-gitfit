import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ContributorService } from "~/modules/contributors/contributors.js";
import { type GitEmailService } from "~/modules/git-emails/git-emails.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogRepository } from "./activity-log.repository.js";
import { ActivityLogError } from "./libs/exceptions/exceptions.js";
import {
	type ActivityLogCreateRequestDto,
	type ActivityLogGetAllResponseDto,
} from "./libs/types/types.js";

class ActivityLogService implements Service {
	private activityLogRepository: ActivityLogRepository;
	private contributorService: ContributorService;
	private gitEmailService: GitEmailService;

	public constructor(
		activityLogRepository: ActivityLogRepository,
		contributorService: ContributorService,
		gitEmailService: GitEmailService,
	) {
		this.activityLogRepository = activityLogRepository;
		this.contributorService = contributorService;
		this.gitEmailService = gitEmailService;
	}

	public async create(
		payload: ActivityLogCreateRequestDto,
	): Promise<ActivityLogGetAllResponseDto> {
		// TODO: extract projectId and createdByUserId from token
		//		 and check if there are any in the database
		//       if there is no verification in decode method
		const project = { id: 1 };
		const createdByUser = { id: 1 };

		const createdActivityLogs: ActivityLogGetAllResponseDto = {
			items: [],
		};

		for (const record of payload.items) {
			const { date, items } = record;

			for (const logItem of items) {
				const { authorEmail, authorName, commitsNumber } = logItem;

				let contributor = await this.contributorService.findByName(authorName);

				if (!contributor) {
					contributor = await this.contributorService.create({
						name: authorName,
					});
				}

				let gitEmail = await this.gitEmailService.findByEmail(authorEmail);

				if (!gitEmail) {
					gitEmail = await this.gitEmailService.create({
						contributorId: contributor.id,
						email: authorEmail,
					});
				}

				try {
					const activityLog = await this.activityLogRepository.create(
						ActivityLogEntity.initializeNew({
							commitsNumber,
							contributor: { id: contributor.id, name: contributor.name },
							createdByUser,
							date,
							gitEmail: { id: gitEmail.id },
							project,
						}),
					);

					createdActivityLogs.items.push(activityLog.toObject());
				} catch {
					throw new ActivityLogError({
						message: ExceptionMessage.CREATE_ACTIVITY_LOG_FAILED,
						status: HTTPCode.INTERNAL_SERVER_ERROR,
					});
				}
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

	public async findAll(): Promise<ActivityLogGetAllResponseDto> {
		const activityLogs = await this.activityLogRepository.findAll();

		return {
			items: activityLogs.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ActivityLogService };
