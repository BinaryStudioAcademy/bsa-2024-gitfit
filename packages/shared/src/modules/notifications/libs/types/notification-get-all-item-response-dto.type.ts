import { type ValueOf } from "../../../../libs/types/value-of.type.js";
import { type NotificationStatus } from "../enums/enums.js";

type NotificationGetAllItemResponseDto = {
	createdAt: string;
	id: number;
	payload: string;
	status: ValueOf<typeof NotificationStatus>;
};

export { type NotificationGetAllItemResponseDto };
