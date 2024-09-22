import { z } from "zod";

import {
	ContributorValidationMessage,
	ContributorValidationRule,
} from "../enums/enums.js";
import { type ContributorPatchRequestDto } from "../types/types.js";

const contributorPatch: z.ZodType<ContributorPatchRequestDto> = z
	.object({
		isHidden: z.boolean(),
		name: z
			.string()
			.trim()
			.min(ContributorValidationRule.NAME_MINIMUM_LENGTH, {
				message: ContributorValidationMessage.NAME_TOO_SHORT,
			})
			.max(ContributorValidationRule.NAME_MAXIMUM_LENGTH, {
				message: ContributorValidationMessage.NAME_TOO_LONG,
			}),
	})
	.required();

export { contributorPatch };
