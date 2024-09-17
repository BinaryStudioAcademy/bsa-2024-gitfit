import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { GroupModel } from "~/modules/groups/group.model.js";
import { ProjectGroupModel } from "~/modules/project-groups/project-group.model.js";

class UserModel extends AbstractModel {
	public deletedAt!: null | string;

	public email!: string;

	public name!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			groups: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_USER_GROUPS}.userId`,
						to: `${DatabaseTableName.USERS_TO_USER_GROUPS}.userGroupId`,
					},
					to: `${DatabaseTableName.USER_GROUPS}.id`,
				},
				modelClass: GroupModel,
				relation: AbstractModel.ManyToManyRelation,
			},
			projectGroups: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_PROJECT_GROUPS}.userId`,
						to: `${DatabaseTableName.USERS_TO_PROJECT_GROUPS}.projectGroupId`,
					},
					to: `${DatabaseTableName.PROJECT_GROUPS}.id`,
				},
				modelClass: ProjectGroupModel,
				relation: AbstractModel.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
