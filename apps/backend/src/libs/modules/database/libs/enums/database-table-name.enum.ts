const DatabaseTableName = {
	MIGRATIONS: "migrations",
	PROJECT_GROUPS: "project_groups",
	PROJECT_GROUPS_TO_PROJECT_PERMISSIONS:
		"project_groups_to_project_permissions",
	PROJECT_PERMISSIONS: "project_permissions",
	PROJECTS: "projects",
	PROJECTS_TO_PROJECT_GROUPS: "projects_to_project_groups",
	USERS: "users",
	USERS_TO_PROJECT_GROUPS: "users_to_project_groups",
} as const;

export { DatabaseTableName };
