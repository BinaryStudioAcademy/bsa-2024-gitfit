import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";
import { type UserPatchRequestDto } from "../types/types.js";

const userPatch: z.ZodType<UserPatchRequestDto> = z
	.object({
		name: z
			.string()
			.trim()
			.regex(UserValidationRule.NAME_PATTERN, {
				message: UserValidationMessage.NAME_PATTERN,
			})
			.min(UserValidationRule.NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.NAME_TOO_SHORT,
			})
			.max(UserValidationRule.NAME_MAXIMUM_LENGTH, {
				message: UserValidationMessage.NAME_TOO_LONG,
			}),
	})
	.required();

export { userPatch };
