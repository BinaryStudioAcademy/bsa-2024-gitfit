import { type PaginationResponseDto } from "../../../../libs/types/types.js";
import { type GroupGetAllItemResponseDto } from "./group-get-all-item-response-dto.type.js";

type GroupGetAllResponseDto = PaginationResponseDto<GroupGetAllItemResponseDto>;

export { type GroupGetAllResponseDto };
