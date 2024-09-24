import { type Knex } from "knex";

const TABLE_NAME = "notifications";

const ColumnName = {
	STATUS: "status",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.enu(ColumnName.STATUS, ["unread", "read"])
			.notNullable()
			.defaultTo("unread");
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.STATUS);
	});
}

export { down, up };
