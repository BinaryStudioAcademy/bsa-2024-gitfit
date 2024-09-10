import { type PaginationResponseDto } from "../../../../libs/types/types.js";
import { type ProjectGroupGetAllItemResponseDto } from "./project-group-get-all-item-response-dto.type.js";

type ProjectGroupGetAllResponseDto =
	PaginationResponseDto<ProjectGroupGetAllItemResponseDto>;

export { type ProjectGroupGetAllResponseDto };
