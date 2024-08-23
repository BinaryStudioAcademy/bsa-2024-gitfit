import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const PermissionName = {
	MANAGE_USER_ACCESS: "Manage User Access",
};

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: "manage_user_access",
		name: PermissionName.MANAGE_USER_ACCESS,
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			name: PermissionName.MANAGE_USER_ACCESS,
		})
		.del();
}

export { down, up };
