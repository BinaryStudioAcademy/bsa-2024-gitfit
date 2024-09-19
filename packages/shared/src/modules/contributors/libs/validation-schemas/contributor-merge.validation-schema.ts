import { z } from "zod";

import { ContributorValidationMessage } from "../enums/enums.js";
import { type ContributorMergeRequestDto } from "../types/types.js";

const contributorMerge: z.ZodType<ContributorMergeRequestDto> = z
	.object({
		currentContributorId: z
			.number({
				required_error:
					ContributorValidationMessage.CURRENT_CONTRIBUTOR_ID_REQUIRED,
			})
			.int()
			.positive(),
		selectedContributorId: z
			.number({
				required_error:
					ContributorValidationMessage.SELECTED_CONTRIBUTOR_ID_REQUIRED,
			})
			.int()
			.positive(),
	})
	.required();

export { contributorMerge };
