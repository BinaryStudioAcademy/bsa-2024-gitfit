import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { GitEmailModel } from "~/modules/git-emails/git-emails.js";

class ContributorModel extends AbstractModel {
	public name!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			gitEmails: {
				join: {
					from: `${DatabaseTableName.CONTRIBUTORS}.id`,
					to: `${DatabaseTableName.GIT_EMAILS}.contributorId`,
				},
				modelClass: GitEmailModel,
				relation: AbstractModel.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.CONTRIBUTORS;
	}
}

export { ContributorModel };
