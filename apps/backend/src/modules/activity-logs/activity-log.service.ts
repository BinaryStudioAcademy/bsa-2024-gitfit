import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogRepository } from "./activity-log.repository.js";
import { ContributorModel } from "./contributor.model.js";
import { GitEmailModel } from "./git-email.model.js";
import { ActivityLogError } from "./libs/exceptions/exceptions.js";
import {
	type ActivityLogCreateRequestDto,
	type ActivityLogCreateResponseDto,
	type ActivityLogGetAllResponseDto,
} from "./libs/types/types.js";

class ActivityLogService implements Service {
	private activityLogRepository: ActivityLogRepository;

	public constructor(activityLogRepository: ActivityLogRepository) {
		this.activityLogRepository = activityLogRepository;
	}

	public async create(
		payload: ActivityLogCreateRequestDto,
	): Promise<ActivityLogCreateResponseDto> {
		// TODO: extract projectId and createdByUserId from token
		//		 and check if there are any in the database
		//       if there is no verification in decode method
		const project = { id: 1 };
		const createdByUser = { id: 1 };

		const createdActivityLogs: ActivityLogCreateResponseDto = {
			items: [],
		};

		for (const record of payload.items) {
			const { date, items } = record;

			for (const logItem of items) {
				const { authorEmail, authorName, commitsNumber } = logItem;

				let contributor;

				try {
					contributor = await ContributorModel.query().findOne({
						name: authorName,
					});

					if (!contributor) {
						contributor = await ContributorModel.query().insert({
							name: authorName,
						});
					}
				} catch {
					throw new ActivityLogError({
						message: ExceptionMessage.CONTRIBUTOR_NOT_FOUND,
						status: HTTPCode.NOT_FOUND,
					});
				}

				let gitEmail;

				try {
					gitEmail = await GitEmailModel.query().findOne({
						email: authorEmail,
					});

					if (!gitEmail) {
						gitEmail = await GitEmailModel.query()
							.insert({ contributorId: contributor.id, email: authorEmail })
							.returning("*");
					}
				} catch {
					throw new ActivityLogError({
						message: ExceptionMessage.GIT_EMAIL_NOT_FOUND,
						status: HTTPCode.NOT_FOUND,
					});
				}

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
