import { type NotificationCreateResponseDto } from "./notification-create-response-dto.type.js";

type NotificationBulkCreateResponseDto = {
	items: NotificationCreateResponseDto[];
};

export { type NotificationBulkCreateResponseDto };
