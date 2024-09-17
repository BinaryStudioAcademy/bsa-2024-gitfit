import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ProjectPermissionModel extends AbstractModel {
	public key!: string;

	public name!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			groups: {
				join: {
					from: `${DatabaseTableName.PROJECT_PERMISSIONS}.id`,
					through: {
						from: `${DatabaseTableName.PROJECT_GROUPS_TO_PROJECT_PERMISSIONS}.permissionId`,
						to: `${DatabaseTableName.PROJECT_GROUPS_TO_PROJECT_PERMISSIONS}.projectGroupId`,
					},
					to: `${DatabaseTableName.PROJECT_GROUPS}.id`,
				},
				modelClass: ProjectPermissionModel,
				relation: AbstractModel.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_PERMISSIONS;
	}
}

export { ProjectPermissionModel };
