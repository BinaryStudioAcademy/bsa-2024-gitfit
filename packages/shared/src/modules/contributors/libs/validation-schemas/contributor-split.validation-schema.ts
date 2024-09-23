import { z } from "zod";

import {
	ContributorValidationMessage,
	ContributorValidationRule,
} from "../enums/enums.js";
import { type ContributorSplitRequestDto } from "../types/types.js";

const contributorSplit: z.ZodType<ContributorSplitRequestDto> = z
	.object({
		gitEmailId: z
			.number({
				required_error: ContributorValidationMessage.GIT_EMAIL_REQUIRED,
			})
			.int()
			.positive(),
		newContributorName: z
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

export { contributorSplit };
