import { type Knex } from "knex";

const TABLE_NAME = "project_api_keys";
const PROJECTS_TABLE_NAME = "projects";
const USERS_TABLE_NAME = "users";

const ColumnName = {
	CREATED_AT: "created_at",
	CREATED_BY_USER_ID: "created_by_user_id",
	ENCRYPTED_KEY: "encrypted_key",
	ID: "id",
	PROJECT_ID: "project_id",
	UPDATED_AT: "updated_at",
	UPDATED_BY_USER_ID: "updated_by_user_id",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.ENCRYPTED_KEY).notNullable();
		table
			.integer(ColumnName.PROJECT_ID)
			.unsigned()
			.notNullable()
			.unique()
			.references("id")
			.inTable(PROJECTS_TABLE_NAME)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.CREATED_BY_USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE_NAME)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.UPDATED_BY_USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE_NAME)
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
