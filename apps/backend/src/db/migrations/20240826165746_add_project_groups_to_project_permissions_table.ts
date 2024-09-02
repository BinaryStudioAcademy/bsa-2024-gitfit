import { type Knex } from "knex";

const TABLE_NAME = "project_groups_to_project_permissions";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	PROJECT_GROUP_ID: "project_group_id",
	PROJECT_PERMISSION_ID: "project_permission_id",
	UPDATED_AT: "updated_at",
} as const;

const PROJECT_GROUPS_TABLE = "project_groups";
const PROJECT_PERMISSIONS_TABLE = "project_permissions";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.PROJECT_GROUP_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(PROJECT_GROUPS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.PROJECT_PERMISSION_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(PROJECT_PERMISSIONS_TABLE)
			.onDelete("CASCADE");
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
