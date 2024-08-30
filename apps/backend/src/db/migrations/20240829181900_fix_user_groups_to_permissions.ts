import { type Knex } from "knex";

const TABLE_NAME = "user_groups_to_permissions";

const ColumnName = {
	PERMISSION_ID: "permission_id",
} as const;

const PERMISSIONS_TABLE = "permissions";
const USERS_TABLE = "users";

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropForeign([ColumnName.PERMISSION_ID]);
		table
			.integer(ColumnName.PERMISSION_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(PERMISSIONS_TABLE)
			.onDelete("CASCADE")
			.alter();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropForeign([ColumnName.PERMISSION_ID]);
		table
			.integer(ColumnName.PERMISSION_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
			.onDelete("CASCADE")
			.alter();
	});
}

export { down, up };
