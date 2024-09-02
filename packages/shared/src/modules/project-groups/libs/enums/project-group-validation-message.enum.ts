import { ProjectGroupValidationRule } from "./project-group-validation-rule.enum.js";

const ProjectGroupValidationMessage = {
	NAME_REQUIRED: "Project name is required.",
	NAME_TOO_LONG: `Name is too long (> ${String(ProjectGroupValidationRule.NAME_MAXIMUM_LENGTH)} symbols).`,
	PROJECT_ID_REQUIRED: "The project ID is required",
	USER_IDS_REQUIRED: "At least one user ID is required.",
} as const;

export { ProjectGroupValidationMessage };
