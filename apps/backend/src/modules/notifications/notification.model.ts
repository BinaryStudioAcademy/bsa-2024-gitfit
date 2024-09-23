import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/users.js";

class NotificationModel extends AbstractModel {
	public isRead!: boolean;

	public payload!: string;

	public receiverUserId!: number;

	public static override get relationMappings(): RelationMappings {
		return {
			receiverUser: {
				join: {
					from: `${DatabaseTableName.NOTIFICATIONS}.receiverUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: AbstractModel.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.NOTIFICATIONS;
	}
}

export { NotificationModel };
