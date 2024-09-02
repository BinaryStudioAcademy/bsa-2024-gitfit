import { z } from "zod";

import {
	ProjectGroupValidationMessage,
	ProjectGroupValidationRule,
} from "../enums/enums.js";
import { type ProjectGroupCreateRequestDto } from "../types/types.js";

const projectGroupCreate: z.ZodType<ProjectGroupCreateRequestDto> = z
	.object({
		name: z
			.string()
			.trim()
			.min(ProjectGroupValidationRule.NAME_MINIMUM_LENGTH, {
				message: ProjectGroupValidationMessage.NAME_REQUIRED,
			})
			.max(ProjectGroupValidationRule.NAME_MAXIMUM_LENGTH, {
				message: ProjectGroupValidationMessage.NAME_TOO_LONG,
			}),
		permissionIds: z.array(z.number().int().positive()),
		projectId: z
			.number({
				required_error: ProjectGroupValidationMessage.PROJECT_ID_REQUIRED,
			})
			.int()
			.positive(),
		userIds: z
			.array(z.number().int().positive())
			.min(ProjectGroupValidationRule.USER_IDS_MINIMUM_LENGTH, {
				message: ProjectGroupValidationMessage.USER_IDS_REQUIRED,
			}),
	})
	.required();

export { projectGroupCreate };
