import { type Knex } from "knex";

const TABLE_NAME = "activity_logs";

const ColumnName = {
	COMMITS_NUMBER: "commits_number",
	CREATED_AT: "created_at",
	CREATED_BY_USER_ID: "created_by_user_id",
	DATE: "date",
	GIT_EMAIL_ID: "git_email_id",
	ID: "id",
	PROJECT_ID: "project_id",
	UPDATED_AT: "updated_at",
} as const;

const GIT_EMAILS_TABLE = "git_emails";
const PROJECTS_TABLE = "projects";
const USERS_TABLE = "users";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.integer(ColumnName.COMMITS_NUMBER).notNullable();
		table.dateTime(ColumnName.DATE).notNullable();
		table
			.integer(ColumnName.CREATED_BY_USER_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(USERS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.GIT_EMAIL_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(GIT_EMAILS_TABLE)
			.onDelete("CASCADE");
		table
			.integer(ColumnName.PROJECT_ID)
			.unsigned()
			.notNullable()
			.references("id")
			.inTable(PROJECTS_TABLE)
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
