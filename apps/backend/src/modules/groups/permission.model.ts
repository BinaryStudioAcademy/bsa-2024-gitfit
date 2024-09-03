import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class PermissionModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			groups: {
				join: {
					from: `${DatabaseTableName.PERMISSIONS}.id`,
					through: {
						from: `${DatabaseTableName.USER_GROUPS_TO_PERMISSIONS}.permissionId`,
						to: `${DatabaseTableName.USER_GROUPS_TO_PERMISSIONS}.userGroupId`,
					},
					to: `${DatabaseTableName.USER_GROUPS}.id`,
				},
				modelClass: PermissionModel,
				relation: AbstractModel.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PERMISSIONS;
	}
}

export { PermissionModel };
