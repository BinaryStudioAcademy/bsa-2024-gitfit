import { GroupValidationRule } from "./group-validation-rule.enum.js";

const GroupValidationMessage = {
	NAME_TOO_LONG: `Name is too long (> ${String(GroupValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
} as const;

export { GroupValidationMessage };
