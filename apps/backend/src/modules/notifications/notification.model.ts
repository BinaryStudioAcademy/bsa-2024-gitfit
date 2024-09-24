import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/users.js";
import { type NotificationStatusValue } from "./libs/types/types.js";

class NotificationModel extends AbstractModel {
	public payload!: string;

	public receiverUserId!: number;

	public status!: NotificationStatusValue;

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
