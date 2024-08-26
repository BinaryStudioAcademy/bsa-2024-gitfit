import { ProjectValidationRule } from "./project-validation-rule.enum.js";

const ProjectValidationMessage = {
	DESCRIPTION_TOO_LONG: `Description is too long (> ${String(ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH)} symbols).`,
	NAME_REQUIRED: "Project name is required.",
	NAME_TOO_LONG: `Name is too long (> ${String(ProjectValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
} as const;

export { ProjectValidationMessage };
