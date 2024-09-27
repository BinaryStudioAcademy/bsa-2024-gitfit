import { type Knex } from "knex";

const PROJECT_GROUPS_TABLE_NAME = "project_groups";
const PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME = "projects_to_project_groups";

const DELETE_UNUSED_PROJECT_GROUPS_FUNCTION_NAME =
	"delete_unused_project_groups";
const AFTER_PROJECT_DELETED_TRIGGER_NAME = "after_project_deleted";

const ColumnName = {
	ID: "id",
	PROJECT_GROUP_ID: "project_group_id",
} as const;

function up(knex: Knex): Promise<void> {
	// TODO: remove all unused project groups which already present in db
	return knex.raw(`
		CREATE OR REPLACE FUNCTION ${DELETE_UNUSED_PROJECT_GROUPS_FUNCTION_NAME}()
		RETURNS TRIGGER AS $$
		BEGIN
				IF NOT EXISTS (
						SELECT 1 FROM ${PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME}
						WHERE ${ColumnName.PROJECT_GROUP_ID} = OLD.${ColumnName.PROJECT_GROUP_ID}
				) THEN
						DELETE FROM ${PROJECT_GROUPS_TABLE_NAME}
						WHERE ${ColumnName.ID} = OLD.${ColumnName.PROJECT_GROUP_ID};
				END IF;
				RETURN OLD;
		END;
		$$ LANGUAGE plpgsql;

		CREATE TRIGGER ${AFTER_PROJECT_DELETED_TRIGGER_NAME}
		AFTER DELETE ON ${PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME}
		FOR EACH ROW
		EXECUTE FUNCTION ${DELETE_UNUSED_PROJECT_GROUPS_FUNCTION_NAME}();
	`);
}

function down(knex: Knex): Promise<void> {
	return knex.raw(`
		DROP TRIGGER IF EXISTS ${AFTER_PROJECT_DELETED_TRIGGER_NAME} ON ${PROJECTS_TO_PROJECT_GROUPS_TABLE_NAME};
		DROP FUNCTION IF EXISTS ${DELETE_UNUSED_PROJECT_GROUPS_FUNCTION_NAME};
	`);
}

export { down, up };
