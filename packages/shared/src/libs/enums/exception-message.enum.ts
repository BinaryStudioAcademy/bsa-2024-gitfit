const ExceptionMessage = {
	ACTIVITY_LOG_CREATE_FAILED: "Failed to save activity logs.",
	CONTRIBUTOR_NOT_FOUND: "Contributor not found.",
	EMAIL_USED: "Email address is already in use.",
	GIT_EMAIL_NOT_FOUND: "Git email not found.",
	GROUP_NAME_USED: "Group name is already in use.",
	GROUP_NOT_FOUND: "Group not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_TOKEN: "Invalid token.",
	INVALID_TOKEN_NO_USER_ID: "Token is invalid: userId missing.",
	NO_TOKEN_PROVIDED: "No token provided.",
	PROJECT_GROUP_CREATE_FAILED: "Failed to create project group.",
	PROJECT_GROUP_NAME_USED: "Project group name is already in use.",
	PROJECT_NAME_USED: "Project name is already in use.",
	PROJECT_NOT_FOUND: "Project not found.",
	TOKEN_EXPIRED: "Token is expired.",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ExceptionMessage };
