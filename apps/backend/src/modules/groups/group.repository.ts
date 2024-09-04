import { transaction } from "objection";

import { NOTHING_DELETED_COUNT } from "~/libs/constants/constants.js";
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
		const { name, permissions, users } = entity.toNewObject();
		const key = changeCase(name, "snakeCase");

		const trx = await transaction.start(this.groupModel.knex());

		const groupData = {
			key,
			name,
			permissions,
			users,
		};

		const group = await this.groupModel
			.query(trx)
			.insertGraph(groupData, { relate: true })
			.returning("*")
			.withGraphFetched("[permissions, users]");

		await trx.commit();

		return GroupEntity.initialize(group);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowsCount = await this.groupModel.query().deleteById(id);

		return deletedRowsCount > NOTHING_DELETED_COUNT;
	}

	public async find(id: number): Promise<GroupModel | null> {
		const group = await this.groupModel.query().findById(id);

		return group ?? null;
	}

	public async findAll(): Promise<{ items: GroupEntity[] }> {
		const groups = await this.groupModel
			.query()
			.withGraphFetched("[permissions, users]");

		return {
			items: groups.map((group) => GroupEntity.initialize(group)),
		};
	}

	public async findByName(name: string): Promise<GroupModel | null> {
		const key = changeCase(name, "snakeCase");
		const group = await this.groupModel.query().findOne({ key });

		return group ?? null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { GroupRepository };
