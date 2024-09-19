import { type Knex } from "knex";

const TABLE_NAME = "projects";

const ColumnName = {
	LAST_ACTIVITY_DATE: "last_activity_date",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dateTime(ColumnName.LAST_ACTIVITY_DATE).nullable();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(ColumnName.LAST_ACTIVITY_DATE);
	});
}

export { down, up };
