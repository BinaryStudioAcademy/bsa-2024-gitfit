const ExceptionMessage = {
	EMAIL_USED: "Email address is already in use.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_TOKEN: "Invalid token.",
	INVALID_TOKEN_NO_USER_ID: "Token is invalid: userId missing.",
	NO_TOKEN_PROVIDED: "No token provided.",
	PROJECT_GROUP_NAME_USED: "Project group name is already in use.",
	PROJECT_NAME_USED: "Project name is already in use.",
	PROJECT_NOT_FOUND: "Project not found.",
	TOKEN_EXPIRED: "Token is expired.",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ExceptionMessage };
