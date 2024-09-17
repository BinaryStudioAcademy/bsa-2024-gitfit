import { z } from "zod";

import {
	NotificationValidationMessage,
	NotificationValidationRule,
} from "../enums/enums.js";
import { type NotificationBulkCreateRequestDto } from "../types/notification-bulk-create-request-dto.type.js";

const notificationBulkCreate: z.ZodType<NotificationBulkCreateRequestDto> =
	z.object({
		payload: z
			.string()
			.trim()
			.min(NotificationValidationRule.PAYLOAD_MINIMUM_LENGTH, {
				message: NotificationValidationMessage.PAYLOAD_REQUIRED,
			})
			.max(NotificationValidationRule.PAYLOAD_MAXIMUM_LENGTH, {
				message: NotificationValidationMessage.PAYLOAD_TOO_LONG,
			}),
		receiverUserIds: z.array(z.number().int().positive()).nonempty({
			message: NotificationValidationMessage.RECEIVER_USER_IDS_REQUIRED,
		}),
	});

export { notificationBulkCreate };
