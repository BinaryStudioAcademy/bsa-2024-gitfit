import { type Knex } from "knex";

const TABLE_NAME = "project_permissions";

const PermissionName = {
	VIEW_PROJECT: "View Project",
} as const;

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: "view_project",
		name: PermissionName.VIEW_PROJECT,
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			name: PermissionName.VIEW_PROJECT,
		})
		.del();
}

export { down, up };
