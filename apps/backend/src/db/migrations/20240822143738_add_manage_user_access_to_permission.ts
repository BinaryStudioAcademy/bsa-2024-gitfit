import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const PermissionKey = {
	MANAGE_USER_ACCESS: "manage_user_access",
};

const PermissionName = {
	MANAGE_USER_ACCESS: "Manage User Access",
};

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.MANAGE_USER_ACCESS,
		name: PermissionName.MANAGE_USER_ACCESS,
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
