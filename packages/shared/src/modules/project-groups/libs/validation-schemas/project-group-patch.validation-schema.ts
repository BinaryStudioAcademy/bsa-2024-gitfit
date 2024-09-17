import { z } from "zod";

import {
	ProjectGroupValidationMessage,
	ProjectGroupValidationRule,
} from "../enums/enums.js";
import { type ProjectGroupPatchRequestDto } from "../types/types.js";

const projectGroupPatch: z.ZodType<ProjectGroupPatchRequestDto> = z
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
		userIds: z
			.array(z.number().int().positive())
			.min(ProjectGroupValidationRule.USER_IDS_MINIMUM_LENGTH, {
				message: ProjectGroupValidationMessage.USER_IDS_REQUIRED,
			}),
	})
	.required();

export { projectGroupPatch };
