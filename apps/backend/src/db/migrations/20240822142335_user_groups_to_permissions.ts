import { type Knex } from "knex";

const TABLE_NAME = "user_groups_to_permissions";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	PERMISSION_ID: "permission_id",
	UPDATED_AT: "updated_at",
	USER_GROUP_ID: "user_group_id",
} as const;

const USERS_TABLE = "users";
const USER_GROUPS_TABLE = "user_groups";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.USER_GROUP_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USER_GROUPS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.PERMISSION_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
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
