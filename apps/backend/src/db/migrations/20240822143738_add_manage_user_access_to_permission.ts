import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const PermissionKey = {
	MANAGE_USER_ACCESS: "manage_user_access",
};

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.MANAGE_USER_ACCESS,
		name: "Manage User Access",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.MANAGE_USER_ACCESS,
		})
		.del();
}

export { down, up };
