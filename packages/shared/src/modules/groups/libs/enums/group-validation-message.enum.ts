import { GroupValidationRule } from "./group-validation-rule.enum.js";

const GroupValidationMessage = {
	NAME_REQUIRED: "Project name is required.",
	NAME_TOO_LONG: `Name is too long (> ${String(GroupValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
	USER_IDS_REQUIRED: "At least one user ID is required.",
} as const;

export { GroupValidationMessage };
