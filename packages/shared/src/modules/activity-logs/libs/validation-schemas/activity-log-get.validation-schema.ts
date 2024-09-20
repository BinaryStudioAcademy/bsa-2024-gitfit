import { z } from "zod";

import { ActivityLogValidationMessage } from "../enums/enums.js";
import { type ActivityLogQueryParameters } from "../types/types.js";

const activityLogGet: z.ZodType<ActivityLogQueryParameters> = z.object({
	endDate: z.string({
		required_error: ActivityLogValidationMessage.END_DATE_REQUIRED,
	}),
	startDate: z.string({
		required_error: ActivityLogValidationMessage.START_DATE_REQUIRED,
	}),
});
export { activityLogGet };
