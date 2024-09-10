import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Repository } from "~/libs/types/types.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogModel } from "./activity-log.model.js";
import { type ContributorModel } from "./contributor.model.js";
import { type GitEmailModel } from "./git-email.model.js";
import { ActivityLogError } from "./libs/exceptions/exceptions.js";

class ActivityLogRepository implements Repository {
	private activityLogModel: typeof ActivityLogModel;

	public constructor(activityLogModel: typeof ActivityLogModel) {
		this.activityLogModel = activityLogModel;
	}

	public async create(entity: ActivityLogEntity): Promise<ActivityLogEntity> {
		const {
			commitsNumber,
			contributor,
			createdByUser,
			date,
			gitEmail,
			project,
		} = entity.toNewObject();

		try {
			const activityLogData = {
				commitsNumber,
				createdByUser,
				date,
				gitEmail,
				project,
			};

			const createdActivityLog = await this.activityLogModel
				.query()
				.insertGraph(activityLogData, { relate: true })
				.returning("*")
				.withGraphFetched("[gitEmail, project, createdByUser]");

			const activityLogWithContributorData = {
				...createdActivityLog,
				contributor,
			};

			return ActivityLogEntity.initialize(activityLogWithContributorData);
		} catch {
			throw new ActivityLogError({
				message: ExceptionMessage.ACTIVITY_LOG_CREATE_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<{ items: ActivityLogEntity[] }> {
		const activityLogs = await this.activityLogModel
			.query()
			.withGraphFetched("[gitEmail.[contributor], project, createdByUser]");

		const activityLogWithContributorData = activityLogs.map((log) => {
			const gitEmail = log.gitEmail as {
				contributor: ContributorModel;
			} & GitEmailModel;
			const { contributor } = gitEmail;

			return {
				...log,
				contributor: {
					id: contributor.id,
					name: contributor.name,
				},
			};
		});

		return {
			items: activityLogWithContributorData.map((activityLog) =>
				ActivityLogEntity.initialize(activityLog),
			),
		};
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ActivityLogRepository };
