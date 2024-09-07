import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { ProjectModel } from "~/modules/projects/project.model.js";
import { UserModel } from "~/modules/users/user.model.js";

import { type ContributorModel } from "./contributor.model.js";
import { GitEmailModel } from "./git-email.model.js";

class ActivityLogModel extends AbstractModel {
	public commitsNumber!: number;
	public contributor!: Pick<ContributorModel, "id" | "name">;
	public createdByUser!: Pick<UserModel, "id">;
	public date!: string;
	public gitEmail!: Pick<GitEmailModel, "id">;
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
