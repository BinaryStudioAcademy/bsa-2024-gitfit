import { type Repository } from "~/libs/types/types.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogModel } from "./activity-log.model.js";

class ActivityLogRepository implements Repository {
	private activityLogModel: typeof ActivityLogModel;

	public constructor(activityLogModel: typeof ActivityLogModel) {
		this.activityLogModel = activityLogModel;
	}

	public async create(entity: ActivityLogEntity): Promise<ActivityLogEntity> {
		const { commitsNumber, createdByUser, date, gitEmail, project } =
			entity.toNewObject();

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
			.execute();

		return ActivityLogEntity.initialize(createdActivityLog);
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
			.withGraphFetched("[gitEmail, project, createdByUser]")
			.execute();

		return {
			items: activityLogs.map((activityLog) =>
				ActivityLogEntity.initialize(activityLog),
			),
		};
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ActivityLogRepository };
