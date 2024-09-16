import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRED: "Email is required.",
	EMAIL_TOO_LONG: `Email must be less than ${String(UserValidationRule.EMAIL_MAXIMUM_LENGTH)} characters long.`,
	EMAIL_TOO_SHORT: `Email must be at least ${String(UserValidationRule.EMAIL_MINIMUM_LENGTH)} characters long.`,
	EMAIL_WRONG: "Incorrect email format.",
	NAME_PATTERN: "Name must contain only Latin letters.",
	NAME_TOO_LONG: `Name is too long (> ${String(UserValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
	NAME_TOO_SHORT: `Name must be at least ${String(UserValidationRule.NAME_MINIMUM_LENGTH)} characters long.`,
	PASSWORD_MINIMUM_LENGTH: `Password must be at least ${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)} characters long.`,
	PASSWORD_PATTERN:
		"Password must contain only Latin letters and include at least one uppercase letter, one lowercase letter, one number and one special character.",
	PASSWORD_TOO_LONG: `Password must be less than ${String(UserValidationRule.PASSWORD_MAXIMUM_LENGTH)} characters long.`,
} as const;

export { UserValidationMessage };
