const ExceptionMessage = {
	EMAIL_USED: "Email address is already in use.",
	GROUP_NAME_USED: "Group name is already in use.",
	GROUP_NOT_FOUND: "Group not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_TOKEN: "Invalid token.",
	INVALID_TOKEN_NO_USER_ID: "Token is invalid: userId missing.",
	NO_TOKEN_PROVIDED: "No token provided.",
	PROJECT_NAME_USED: "Project name is already in use.",
	PROJECT_NOT_FOUND: "Project not found.",
	TOKEN_EXPIRED: "Token is expired.",
	UPDATE_PROJECT_FAILED: "Failed to update project.",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ExceptionMessage };
