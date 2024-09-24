import { type NotificationStatusValue } from "./notification-status-value.type.js";

type NotificationGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	payload: string;
	status: NotificationStatusValue;
};

export { type NotificationGetAllItemResponseDto };
