import { type Knex } from "knex";

const TABLE_NAME = "projects";

const ColumnName = {
	DESCRIPTION: "description",
} as const;

const FieldLimit = {
	DESCRIPTION: 1000,
	DESCRIPTION_PREVIOUS: 50,
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(ColumnName.DESCRIPTION, FieldLimit.DESCRIPTION).alter();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.string(ColumnName.DESCRIPTION, FieldLimit.DESCRIPTION_PREVIOUS)
			.alter();
	});
}

export { down, up };
