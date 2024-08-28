import { type Knex } from "knex";

const TABLE_NAME = "project_permissions";

const PermissionKey = {
	VIEW_PROJECT: "view_project",
} as const;

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.VIEW_PROJECT,
		name: "View Project",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.VIEW_PROJECT,
		})
		.del();
}

export { down, up };
