import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { PermissionModel } from "~/modules/permissions/permission.model.js";
import { UserModel } from "~/modules/users/user.model.js";

class GroupModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public permissions!: PermissionModel[];

	public users!: UserModel[];

	public static override get relationMappings(): RelationMappings {
		return {
			permissions: {
				join: {
					from: `${DatabaseTableName.USER_GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.USER_GROUPS_TO_PERMISSIONS}.userGroupId`,
						to: `${DatabaseTableName.USER_GROUPS_TO_PERMISSIONS}.permissionId`,
					},
					to: `${DatabaseTableName.PERMISSIONS}.id`,
				},
				modelClass: PermissionModel,
				relation: AbstractModel.ManyToManyRelation,
			},
			users: {
				join: {
					from: `${DatabaseTableName.USER_GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_USER_GROUPS}.userGroupId`,
						to: `${DatabaseTableName.USERS_TO_USER_GROUPS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: AbstractModel.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USER_GROUPS;
	}
}

export { GroupModel };
