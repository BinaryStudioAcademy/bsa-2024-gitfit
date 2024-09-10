import { type Knex } from "knex";

const USER_GROUPS_TABLE = "user_groups";
const PERMISSIONS_TABLE = "permissions";
const USER_GROUPS_TO_PERMISSIONS_TABLE = "user_groups_to_permissions";

const GroupKey = {
	ADMINS: "admins",
} as const;

const PermissionKey = {
	MANAGE_USER_ACCESS: "manage_user_access",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		const [group] = (await trx(USER_GROUPS_TABLE)
			.insert({
				key: GroupKey.ADMINS,
				name: "Admins",
			})
			.returning("id")) as [{ id: number }];

		const [permission] = (await trx(PERMISSIONS_TABLE)
			.select("id")
			.where({ key: PermissionKey.MANAGE_USER_ACCESS })) as [{ id: number }];

		await trx(USER_GROUPS_TO_PERMISSIONS_TABLE).insert({
			permission_id: permission.id,
			user_group_id: group.id,
		});
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.transaction(async (trx) => {
		const [group] = (await trx(USER_GROUPS_TABLE)
			.select("id")
			.where({ key: GroupKey.ADMINS })) as [{ id: number }];

		await trx(USER_GROUPS_TO_PERMISSIONS_TABLE)
			.where({ user_group_id: group.id })
			.del();

		await trx(USER_GROUPS_TABLE).where({ id: group.id }).del();
	});
}

export { down, up };
