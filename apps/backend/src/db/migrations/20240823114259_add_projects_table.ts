import { type Knex } from "knex";

const TABLE_NAME = "projects";

const ColumnName = {
	API_KEY: "api_key",
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	ID: "id",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const FieldLimit = {
	NAME: 50,
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.NAME, FieldLimit.NAME).unique().notNullable();
		table.text(ColumnName.DESCRIPTION);
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
