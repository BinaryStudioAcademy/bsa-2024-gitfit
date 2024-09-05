import { type Knex } from "knex";

const TABLE_NAME = "git_emails";

const ColumnName = {
	CONTRIBUTOR_ID: "contributor_id",
	CREATED_AT: "created_at",
	EMAIL: "email",
	ID: "id",
	UPDATED_AT: "updated_at",
} as const;

const CONTRIBUTORS_TABLE = "contributors";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.EMAIL).unique().notNullable();
		table
			.integer(ColumnName.CONTRIBUTOR_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(CONTRIBUTORS_TABLE)
			.onDelete("CASCADE");
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
