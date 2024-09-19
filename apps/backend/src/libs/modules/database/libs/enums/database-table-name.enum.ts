const DatabaseTableName = {
	ACTIVITY_LOGS: "activity_logs",
	CONTRIBUTORS: "contributors",
	GIT_EMAILS: "git_emails",
	MIGRATIONS: "migrations",
	NOTIFICATIONS: "notifications",
	PERMISSIONS: "permissions",
	PROJECT_API_KEYS: "project_api_keys",
	PROJECT_GROUPS: "project_groups",
	PROJECT_GROUPS_TO_PROJECT_PERMISSIONS:
		"project_groups_to_project_permissions",
	PROJECT_PERMISSIONS: "project_permissions",
	PROJECTS: "projects",
	PROJECTS_TO_PROJECT_GROUPS: "projects_to_project_groups",
	USER_GROUPS: "user_groups",
	USER_GROUPS_TO_PERMISSIONS: "user_groups_to_permissions",
	USERS: "users",
	USERS_TO_PROJECT_GROUPS: "users_to_project_groups",
	USERS_TO_USER_GROUPS: "users_to_user_groups",
} as const;

export { DatabaseTableName };
