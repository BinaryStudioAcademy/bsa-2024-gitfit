import { type Knex } from "knex";

const TABLE_NAME = "project_api_keys";

const ColumnName = {
	CREATED_AT: "created_at",
	CREATED_BY: "created_by",
	ENCRYPTED_KEY: "encrypted_key",
	ID: "id",
	PROJECT_ID: "project_id",
	UPDATED_AT: "updated_at",
	UPDATED_BY: "updated_by",
} as const;

const PROJECTS_TABLE = "projects";
const USERS_TABLE = "users";

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
			.inTable(PROJECTS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.CREATED_BY)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.UPDATED_BY)
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
