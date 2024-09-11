import { type ProjectGetAllItemResponseDto } from "./project-get-all-item-response-dto.type.js";

type ProjectGetAllResponseDto = {
	hasMore: boolean;
	items: ProjectGetAllItemResponseDto[];
};

export { type ProjectGetAllResponseDto };
