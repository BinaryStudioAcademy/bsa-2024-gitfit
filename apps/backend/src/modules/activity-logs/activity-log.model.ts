import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { GitEmailModel } from "~/modules/git-emails/git-emails.js";
import { ProjectModel } from "~/modules/projects/project.model.js";
import { UserModel } from "~/modules/users/user.model.js";

class ActivityLogModel extends AbstractModel {
	public commitsNumber!: number;
	public createdByUser!: Pick<UserModel, "id">;
	public date!: string;
	public gitEmail!: Pick<GitEmailModel, "contributor" | "id">;
	public project!: Pick<ProjectModel, "id">;

	public static override get relationMappings(): RelationMappings {
		return {
			createdByUser: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LOGS}.createdByUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
			gitEmail: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LOGS}.gitEmailId`,
					to: `${DatabaseTableName.GIT_EMAILS}.id`,
				},
				modelClass: GitEmailModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
			project: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LOGS}.projectId`,
					to: `${DatabaseTableName.PROJECTS}.id`,
				},
				modelClass: ProjectModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.ACTIVITY_LOGS;
	}
}

export { ActivityLogModel };
