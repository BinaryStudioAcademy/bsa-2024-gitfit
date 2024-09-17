import { z } from "zod";

import { ActivityLogValidationMessage } from "../enums/enums.js";
import { GIT_EMAIL_REGEX } from "./libs/constants/constants.js";

const activityLogItemCreate = z.object({
	date: z.string({
		required_error: ActivityLogValidationMessage.DATE_REQUIRED,
	}),
	items: z
		.array(
			z.object({
				authorEmail: z
					.string({
						required_error: ActivityLogValidationMessage.AUTHOR_EMAIL_REQUIRED,
					})
					.regex(
						GIT_EMAIL_REGEX,
						ActivityLogValidationMessage.AUTHOR_EMAIL_INVALID,
					),
				authorName: z.string({
					required_error: ActivityLogValidationMessage.AUTHOR_NAME_REQUIRED,
				}),
				commitsNumber: z
					.number({
						required_error:
							ActivityLogValidationMessage.COMMITS_NUMBER_REQUIRED,
					})
					.int()
					.positive(),
			}),
		)
		.nonempty(ActivityLogValidationMessage.ITEMS_REQUIRED),
});

const activityLogCreate = z.object({
	items: z
		.array(activityLogItemCreate)
		.nonempty(ActivityLogValidationMessage.ITEMS_REQUIRED),
	userId: z
		.number({
			required_error: ActivityLogValidationMessage.USER_ID_REQUIRED,
		})
		.int()
		.positive(),
});
export { activityLogCreate };
