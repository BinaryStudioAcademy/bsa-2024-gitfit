import { type Knex } from "knex";

const TABLE_NAME = "contributors";

const ColumnName = {
	IS_HIDDEN: "is_hidden",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.boolean(ColumnName.IS_HIDDEN).defaultTo(false).notNullable();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.IS_HIDDEN);
	});
}

export { down, up };
