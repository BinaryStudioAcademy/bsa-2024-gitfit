import { type Knex } from "knex";

const TABLE_NAME = "notifications";
const USERS_TABLE_NAME = "users";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	PAYLOAD: "payload",
	RECEIVER_USER_ID: "receiver_user_id",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.integer(ColumnName.RECEIVER_USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE_NAME)
			.onDelete("CASCADE");
		table.string(ColumnName.PAYLOAD).notNullable();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
