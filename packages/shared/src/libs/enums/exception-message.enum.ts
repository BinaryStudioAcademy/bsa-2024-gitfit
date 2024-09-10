const ExceptionMessage = {
	CREATE_PROJECT_GROUP_FAILED: "Failed to create project group",
	GROUP_NAME_USED: "Group name is already in use.",
	GROUP_NOT_FOUND: "Group not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_TOKEN: "Invalid token.",
	INVALID_TOKEN_NO_USER_ID: "Token is invalid: userId missing.",
	NO_PERMISSION: "You do not have permission to access this resource.",
	NO_TOKEN_PROVIDED: "No token provided.",
	PROJECT_API_KEY_ALREADY_EXISTS: "API key already exists for the project.",
	PROJECT_GROUP_NAME_USED: "Project group name is already in use.",
	PROJECT_NAME_USED: "Project name is already in use.",
	PROJECT_NOT_FOUND: "Project not found.",
	TOKEN_EXPIRED: "Token is expired.",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ExceptionMessage };
