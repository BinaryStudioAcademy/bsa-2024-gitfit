const DatabaseTableName = {
	MIGRATIONS: "migrations",
	PERMISSIONS: "permissions",
	PROJECTS: "projects",
	USER_GROUPS: "user_groups",
	USER_GROUPS_TO_PERMISSIONS: "user_groups_to_permissions",
	USERS: "users",
	USERS_TO_USER_GROUPS: "users_to_user_groups",
} as const;

export { DatabaseTableName };
