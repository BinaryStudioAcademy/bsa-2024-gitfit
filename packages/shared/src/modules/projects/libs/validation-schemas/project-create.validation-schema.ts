import { z } from "zod";

import {
	ProjectValidationMessage,
	ProjectValidationRule,
} from "../enums/enums.js";
import { type ProjectCreateRequestDto } from "../types/types.js";

const projectCreate: z.ZodType<ProjectCreateRequestDto> = z
	.object({
		description: z
			.string()
			.trim()
			.max(ProjectValidationRule.DESCRIPTION_MAXIMUM_LENGTH, {
				message: ProjectValidationMessage.DESCRIPTION_TOO_LONG,
			}),
		name: z
			.string()
			.trim()
			.min(ProjectValidationRule.NAME_MINIMUM_LENGTH, {
				message: ProjectValidationMessage.NAME_REQUIRED,
			})
			.max(ProjectValidationRule.NAME_MAXIMUM_LENGTH, {
				message: ProjectValidationMessage.NAME_TOO_LONG,
			}),
	})
	.required();

export { projectCreate };
