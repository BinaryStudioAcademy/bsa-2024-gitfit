import { type PaginationResponseDto } from "../../../../libs/types/types.js";
import { type NotificationGetAllItemResponseDto } from "./notification-get-all-item-response-dto.type.js";

type NotificationGetAllResponseDto =
	PaginationResponseDto<NotificationGetAllItemResponseDto>;

export { type NotificationGetAllResponseDto };
