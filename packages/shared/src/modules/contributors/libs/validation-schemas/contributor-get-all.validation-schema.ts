import { z } from "zod";

import {
	ContributorOrderByKey,
	ContributorValidationMessage,
} from "../enums/enums.js";
import { type ContributorGetAllQueryParameters } from "../types/types.js";

const contributorGetAll: z.ZodType<ContributorGetAllQueryParameters> = z.object(
	{
		orderBy: z
			.nativeEnum(ContributorOrderByKey, {
				message: ContributorValidationMessage.INVALID_ORDER_BY_QUERY_PARAMETER,
			})
			.optional(),
	},
);

export { contributorGetAll };
