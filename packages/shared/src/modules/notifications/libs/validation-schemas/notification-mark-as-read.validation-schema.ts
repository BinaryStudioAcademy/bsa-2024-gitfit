import { z } from "zod";

import { NotificationValidationMessage } from "../enums/enums.js";
import { type NotificationBulkMarkAsReadRequestDto } from "../types/types.js";

const notificationMarkAsRead: z.ZodType<NotificationBulkMarkAsReadRequestDto> =
	z.object({
		notificationIds: z.array(z.number().int().positive()).nonempty({
			message: NotificationValidationMessage.NOTIFICATION_IDS_REQUIRED,
		}),
	});

export { notificationMarkAsRead };
