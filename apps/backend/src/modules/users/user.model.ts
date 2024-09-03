import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { GroupModel } from "../groups/group.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public groups!: Pick<GroupModel, "id" | "name">[];

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
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
