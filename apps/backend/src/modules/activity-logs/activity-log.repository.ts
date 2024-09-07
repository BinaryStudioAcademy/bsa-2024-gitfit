import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Repository } from "~/libs/types/types.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogModel } from "./activity-log.model.js";
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

			const activityLogWithContributor = {
				...createdActivityLog,
				contributor,
			};

			return ActivityLogEntity.initialize(activityLogWithContributor);
		} catch {
			throw new ActivityLogError({
				message: ExceptionMessage.CREATE_ACTIVITY_LOG_FAILED,
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
			.withGraphFetched("[gitEmail, project, createdByUser]");

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
