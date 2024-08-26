import { changeToSnakeCase } from "~/libs/helpers/helpers.js";
import { type Repository } from "~/libs/types/types.js";

import { GroupEntity } from "./group.entity.js";
import { type UserGroupModel } from "./user-group.model.js";
import { UserGroupsToPermissionsModel } from "./user-groups-to-permissions.model.js";
import { UsersToUserGroupModel } from "./users-to-user-group.model.js";

class GroupRepository implements Repository {
	private groupModel: typeof UserGroupModel;

	public constructor(groupModel: typeof UserGroupModel) {
		this.groupModel = groupModel;
	}

	public async create(entity: GroupEntity): Promise<GroupEntity> {
		const { name, permissionIds, userIds } = entity.toNewObject();
		const key = changeToSnakeCase(name);

		const group = await this.groupModel.transaction(async (trx) => {
			const createdGroup = await this.groupModel.query(trx).insert({
				key,
				name,
			});

			await UserGroupsToPermissionsModel.query(trx).insert(
				permissionIds.map((permissionId) => ({
					permissionId,
					userGroupId: createdGroup.id,
				})),
			);

			await UsersToUserGroupModel.query(trx).insert(
				userIds.map((userId) => ({
					userGroupId: createdGroup.id,
					userId,
				})),
			);

			return createdGroup;
		});

		return GroupEntity.initialize({
			id: group.id,
			name: group.name,
			permissionIds,
			userIds,
		});
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve([]);
	}

	public async findByName(name: string): Promise<GroupEntity | null> {
		const key = changeToSnakeCase(name);
		const group = await this.groupModel.query().findOne({ key });

		if (!group) {
			return null;
		}

		return GroupEntity.initialize({
			id: group.id,
			name: group.name,
			permissionIds: [],
			userIds: [],
		});
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { GroupRepository };
