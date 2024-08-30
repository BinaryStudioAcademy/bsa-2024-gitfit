import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { ProjectModel } from "../projects/project.model.js";
import { UserModel } from "../users/user.model.js";
import { ProjectPermissionModel } from "./project-permission.model.js";

class ProjectGroupModel extends AbstractModel {
	public key!: string;
	public name!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			permissions: {
				join: {
					from: `${DatabaseTableName.PROJECT_GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.PROJECT_GROUPS_TO_PROJECT_PERMISSIONS}.projectGroupId`,
						to: `${DatabaseTableName.PROJECT_GROUPS_TO_PROJECT_PERMISSIONS}.projectPermissionId`,
					},
					to: `${DatabaseTableName.PROJECT_PERMISSIONS}.id`,
				},
				modelClass: ProjectPermissionModel,
				relation: Model.ManyToManyRelation,
			},
			projects: {
				join: {
					from: `${DatabaseTableName.PROJECT_GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.PROJECTS_TO_PROJECT_GROUPS}.projectGroupId`,
						to: `${DatabaseTableName.PROJECTS_TO_PROJECT_GROUPS}.projectId`,
					},
					to: `${DatabaseTableName.PROJECTS}.id`,
				},
				modelClass: ProjectModel,
				relation: Model.ManyToManyRelation,
			},
			users: {
				join: {
					from: `${DatabaseTableName.PROJECT_GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_PROJECT_GROUPS}.projectGroupId`,
						to: `${DatabaseTableName.USERS_TO_PROJECT_GROUPS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PROJECT_GROUPS;
	}
}

export { ProjectGroupModel };
