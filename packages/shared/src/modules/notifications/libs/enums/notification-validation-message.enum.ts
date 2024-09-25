import { NotificationValidationRule } from "./notification-validation-rule.enum.js";

const NotificationValidationMessage = {
	NOTIFICATION_IDS_REQUIRED: "At least one notification is required.",
	PAYLOAD_REQUIRED: "Notification payload is required.",
	PAYLOAD_TOO_LONG: `Payload cannot be longer than ${String(NotificationValidationRule.PAYLOAD_MAXIMUM_LENGTH)} characters.`,
	RECEIVER_USER_ID_REQUIRED: "Receiver user is required.",
	RECEIVER_USER_IDS_REQUIRED: "At least one receiver user is required.",
} as const;

export { NotificationValidationMessage };
