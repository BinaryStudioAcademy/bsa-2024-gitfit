import { type PaginationQueryParameters } from "../../../../libs/types/types.js";

type NotificationGetAllRequestDto = {
	userId: number;
} & PaginationQueryParameters;

export { type NotificationGetAllRequestDto };
