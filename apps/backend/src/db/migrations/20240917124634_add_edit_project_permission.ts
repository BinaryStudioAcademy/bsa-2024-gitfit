import { type Knex } from "knex";

const TABLE_NAME = "project_permissions";

const PermissionKey = {
	EDIT_PROJECT: "edit_project",
} as const;

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.EDIT_PROJECT,
		name: "Edit Project",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.EDIT_PROJECT,
		})
		.del();
}

export { down, up };
