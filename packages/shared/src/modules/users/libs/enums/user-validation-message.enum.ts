import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRED: "Email is required.",
	EMAIL_TOO_LONG: `Email must be less than ${String(UserValidationRule.EMAIL_MAXIMUM_LENGTH)} characters long.`,
	EMAIL_WRONG: "Email is wrong.",
	NAME_REQUIRED: "Name is required.",
	NAME_TOO_LONG: `Name is too long (> ${String(UserValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
	NAME_TOO_SHORT: `Name must be at least ${String(UserValidationRule.NAME_MINIMUM_LENGTH)} characters long.`,
	PASSWORD_LOWERCASE_REQUIRED:
		"Password must include at least one lowercase letter.",
	PASSWORD_MINIMUM_LENGTH: `Password must be at least ${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)} characters long.`,
	PASSWORD_NUMBER_REQUIRED: "Password must include at least one number.",
	PASSWORD_SPECIAL_CHAR_REQUIRED:
		"Password must include at least one special character (e.g., !@#$%).",
	PASSWORD_TOO_LONG: `Password must be less than ${String(UserValidationRule.PASSWORD_MAXIMUM_LENGTH)} characters long.`,
	PASSWORD_UPPERCASE_REQUIRED:
		"Password must include at least one uppercase letter.",
} as const;

export { UserValidationMessage };
