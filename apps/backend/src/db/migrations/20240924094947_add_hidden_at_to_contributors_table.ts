import { type Knex } from "knex";

const TABLE_NAME = "contributors";

const ColumnName = {
	HIDDEN_AT: "hidden_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dateTime(ColumnName.HIDDEN_AT).nullable().defaultTo(null);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.HIDDEN_AT);
	});
}

export { down, up };
