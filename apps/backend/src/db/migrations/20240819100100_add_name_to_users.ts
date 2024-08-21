import { type Knex } from "knex";

const TABLE_NAME = "users";

const ColumnName = {
	NAME: "name",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(ColumnName.NAME).defaultTo("User").notNullable();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.NAME);
	});
}

export { down, up };
