import { z } from "zod";

import { ContributorValidationMessage } from "../enums/enums.js";
import { type ContributorMergeRequestDto } from "../types/types.js";

const contributorMerge: z.ZodType<ContributorMergeRequestDto> = z
	.object({
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
