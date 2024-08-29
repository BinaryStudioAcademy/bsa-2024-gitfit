import { type Knex } from "knex";

const TABLE_NAME = "projects";

const ColumnName = {
	DESCRIPTION: "description",
} as const;

const FieldLimit = {
	DOWN_DESCRIPTION: 50,
	UP_DESCRIPTION: 1000,
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(ColumnName.DESCRIPTION, FieldLimit.UP_DESCRIPTION).alter();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(ColumnName.DESCRIPTION, FieldLimit.DOWN_DESCRIPTION).alter();
	});
}

export { down, up };
