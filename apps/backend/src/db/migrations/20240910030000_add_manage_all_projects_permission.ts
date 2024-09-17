import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const PermissionKey = {
	MANAGE_ALL_PROJECTS: "manage_all_projects",
};

function up(knex: Knex): Promise<void> {
	return knex(TABLE_NAME).insert({
		key: PermissionKey.MANAGE_ALL_PROJECTS,
		name: "Manage All Projects",
	});
}

function down(knex: Knex): Promise<void> {
	return knex(TABLE_NAME)
		.where({
			key: PermissionKey.MANAGE_ALL_PROJECTS,
		})
		.del();
}

export { down, up };
