import { type Knex } from "knex";

const TABLE_NAME = "notifications";

const ColumnName = {
	IS_READ: "is_read",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.boolean(ColumnName.IS_READ).notNullable().defaultTo(false);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.IS_READ);
	});
}

export { down, up };
