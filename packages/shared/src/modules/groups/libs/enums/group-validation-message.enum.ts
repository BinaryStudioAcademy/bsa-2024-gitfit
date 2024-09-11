import { GroupValidationRule } from "./group-validation-rule.enum.js";

const GroupValidationMessage = {
	NAME_REQUIRED: "Group name is required.",
	NAME_TOO_LONG: `Name cannot be longer than ${String(GroupValidationRule.NAME_MAXIMUM_LENGTH)} characters.`,
	USER_IDS_REQUIRED: "At least one user is required.",
} as const;

export { GroupValidationMessage };
