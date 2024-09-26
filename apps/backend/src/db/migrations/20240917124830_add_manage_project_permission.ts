import { type Knex } from "knex";

const TABLE_NAME = "project_permissions";

const PermissionKey = {
	MANAGE_PROJECT: "manage_project",
} as const;

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.MANAGE_PROJECT,
		name: "Manage Project",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.MANAGE_PROJECT,
		})
		.del();
}

export { down, up };
