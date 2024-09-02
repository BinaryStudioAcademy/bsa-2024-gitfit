import { type Knex } from "knex";

const TABLE_NAME = "project_groups";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	KEY: "key",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const FieldLimit = {
	NAME: 100,
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.KEY).notNullable().unique();
		table.string(ColumnName.NAME, FieldLimit.NAME).notNullable();
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
