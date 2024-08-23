const ExceptionMessage = {
	EMAIL_USED: "Email address is already in use.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_TOKEN: "Invalid token.",
	INVALID_TOKEN_NO_USER_ID: "Token is invalid: userId missing.",
	NAME_NOT_UNIQUE: "Name should be unique.",
	NO_TOKEN_PROVIDED: "No token provided.",
	TOKEN_EXPIRED: "Token is expired.",
	USER_NOT_FOUND: "User not found.",
} as const;

export { ExceptionMessage };
