import { type ActivityLogCreateItemRequestDto } from "./activity-log-create-item-request-dto.type.js";

type ActivityLogCreateRequestDto = {
	items: ActivityLogCreateItemRequestDto[];
	userId: number;
};

export { type ActivityLogCreateRequestDto };
