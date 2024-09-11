import { type Repository } from "~/libs/types/types.js";
import { type ContributorModel } from "~/modules/contributors/contributors.js";
import { type GitEmailModel } from "~/modules/git-emails/git-emails.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogModel } from "./activity-log.model.js";

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
			.withGraphFetched("[gitEmail, project, createdByUser]")
			.execute();

		const activityLogWithContributorData = {
			...createdActivityLog,
			contributor,
		};

		return ActivityLogEntity.initialize(activityLogWithContributorData);
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
			.withGraphFetched("[gitEmail.[contributor], project, createdByUser]")
			.execute();

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
