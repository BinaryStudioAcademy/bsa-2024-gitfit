import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { ContributorModel } from "~/modules/contributors/contributors.js";

class GitEmailModel extends AbstractModel {
	public contributor!: Pick<ContributorModel, "id" | "name">;
	public contributorId!: number;
	public email!: string;

	public static override get relationMappings(): RelationMappings {
		return {
			contributor: {
				join: {
					from: `${DatabaseTableName.GIT_EMAILS}.contributorId`,
					to: `${DatabaseTableName.CONTRIBUTORS}.id`,
				},
				modelClass: ContributorModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.GIT_EMAILS;
	}
}

export { GitEmailModel };
