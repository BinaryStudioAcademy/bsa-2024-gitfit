import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const PermissionKey = {
	VIEW_ALL_PROJECTS: "view_all_projects",
};

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.VIEW_ALL_PROJECTS,
		name: "View All Projects",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.VIEW_ALL_PROJECTS,
		})
		.del();
}

export { down, up };
