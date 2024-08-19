import { UserValidationRule } from "./user-validation-rule.enum.js";

const UserValidationMessage = {
	EMAIL_REQUIRED: "Email is required.",
	EMAIL_WRONG: "Email is wrong.",
	NAME_REQUIRED: "Name is required.",
	NAME_TOO_LONG: `Name is too long (> ${String(UserValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
	PASSWORD_MINIMUM_LENGTH: `Password must be at least ${String(UserValidationRule.PASSWORD_MINIMUM_LENGTH)} characters long.`,
} as const;

export { UserValidationMessage };
