import { changeCase } from "~/libs/helpers/helpers.js";
import { type Repository } from "~/libs/types/types.js";

import { GroupEntity } from "./group.entity.js";
import { type GroupModel } from "./group.model.js";

class GroupRepository implements Repository {
	private groupModel: typeof GroupModel;

	public constructor(groupModel: typeof GroupModel) {
		this.groupModel = groupModel;
	}

	public async create(entity: GroupEntity): Promise<GroupEntity> {
		const { name, permissionIds, userIds } = entity.toNewObject();
		const key = changeCase(name, "snakeCase");

		const groupData = {
			key,
			name,
			permissions: permissionIds.map((id) => ({ id })),
			users: userIds.map((id) => ({ id })),
		};

		const group = await this.groupModel
			.query()
			.insertGraph(groupData, { relate: true })
			.returning("*")
			.withGraphJoined("[permissions, users]");

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
		const key = changeCase(name, "snakeCase");
		const group = await this.groupModel
			.query()
			.findOne({ key })
			.withGraphFetched("[permissions, users]");

		if (!group) {
			return null;
		}

		return GroupEntity.initialize({
			id: group.id,
			name: group.name,
			permissionIds: group.permissions.map((permission) => permission.id),
			userIds: group.users.map((user) => user.id),
		});
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { GroupRepository };
