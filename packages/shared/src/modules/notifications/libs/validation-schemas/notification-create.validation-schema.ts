import { z } from "zod";

import {
	NotificationValidationMessage,
	NotificationValidationRule,
} from "../enums/enums.js";
import { type NotificationCreateRequestDto } from "../types/notification-create-request-dto.type.js";

const notificationCreate: z.ZodType<NotificationCreateRequestDto> = z.object({
	payload: z
		.string()
		.trim()
		.min(NotificationValidationRule.PAYLOAD_MINIMUM_LENGTH, {
			message: NotificationValidationMessage.PAYLOAD_REQUIRED,
		})
		.max(NotificationValidationRule.PAYLOAD_MAXIMUM_LENGTH, {
			message: NotificationValidationMessage.PAYLOAD_TOO_LONG,
		}),
	receiverUserId: z
		.number({
			required_error: NotificationValidationMessage.RECEIVER_USER_ID_REQUIRED,
		})
		.int()
		.positive(),
});

export { notificationCreate };
