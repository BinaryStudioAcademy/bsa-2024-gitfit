import { type PaginationResponseDto } from "../../../../libs/types/types.js";
import { type ProjectGetAllItemResponseDto } from "./project-get-all-item-response-dto.type.js";

type ProjectGetAllResponseDto =
	PaginationResponseDto<ProjectGetAllItemResponseDto>;

export { type ProjectGetAllResponseDto };
