import { ExceptionMessage } from "~/libs/enums/enums.js";
import { ApplicationError } from "~/libs/exceptions/exceptions.js";
import { changeToSnakeCase } from "~/libs/helpers/helpers.js";
import { type Service } from "~/libs/types/service.type.js";

import { type GroupCreateRequestDto } from "./libs/types/types.js";
import { UserGroupModel } from "./user-group.model.js";
import { UserGroupsToPermissionsModel } from "./user-groups-to-permissions.model.js";
import { UsersToUserGroupModel } from "./users-to-user-group.model.js";

class GroupService implements Service {
	public async create(payload: GroupCreateRequestDto): Promise<void> {
		const { name, permissionIds, userIds } = payload;
		const key = changeToSnakeCase(name);

		const existingGroup = await UserGroupModel.query().findOne({ key });

		if (existingGroup) {
			throw new ApplicationError({
				message: ExceptionMessage.NAME_NOT_UNIQUE,
			});
		}

		await UserGroupModel.transaction(async (trx) => {
			const userGroup = await UserGroupModel.query(trx).insert({
				key,
				name,
			});

			await UserGroupsToPermissionsModel.query(trx).insert(
				permissionIds.map((permissionId) => ({
					permissionId,
					userGroupId: userGroup.id,
				})),
			);

			await UsersToUserGroupModel.query(trx).insert(
				userIds.map((userId) => ({
					userGroupId: userGroup.id,
					userId,
				})),
			);
		});
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { GroupService };
