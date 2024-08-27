import { z } from "zod";

import { GroupValidationMessage, GroupValidationRule } from "../enums/enums.js";
import { type GroupCreateRequestDto } from "../types/types.js";

const groupCreate: z.ZodType<GroupCreateRequestDto> = z.object({
	name: z
		.string()
		.trim()
		.min(GroupValidationRule.NAME_MINIMUM_LENGTH, {
			message: GroupValidationMessage.NAME_REQUIRED,
		})
		.max(GroupValidationRule.NAME_MAXIMUM_LENGTH, {
			message: GroupValidationMessage.NAME_TOO_LONG,
		}),
	permissionIds: z.array(z.number().int().positive()),
	userIds: z.array(z.number().int().positive()).nonempty({
		message: GroupValidationMessage.USER_IDS_REQUIRED,
	}),
});

export { groupCreate };
