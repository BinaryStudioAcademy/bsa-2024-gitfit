import { type Knex } from "knex";

const PROJECT_GROUPS_TABLE_NAME = "project_groups";
const PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME = "projects_to_project_groups";

const ColumnName = {
	ID: "id",
	PROJECT_GROUP_ID: "project_group_id",
} as const;

function up(knex: Knex): Promise<void> {
	return knex(PROJECT_GROUPS_TABLE_NAME)
		.whereNotIn(
			ColumnName.ID,
			knex(PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME).select(
				ColumnName.PROJECT_GROUP_ID,
			),
		)
		.delete();
}

function down(): Promise<void> {
	return Promise.resolve();
}

export { down, up };
