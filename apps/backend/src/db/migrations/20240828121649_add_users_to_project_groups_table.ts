import { type Knex } from "knex";

const TABLE_NAME = "users_to_project_groups";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	PROJECT_GROUP_ID: "project_group_id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const PROJECT_GROUPS_TABLE = "project_groups";
const USERS_TABLE = "users";

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
			.integer(ColumnName.USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
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
