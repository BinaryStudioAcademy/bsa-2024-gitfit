import { type PaginationResponse } from "../../../../libs/types/types.js";
import { type UserGetAllItemResponseDto } from "./user-get-all-item-response-dto.type.js";

type UserGetAllResponseDto = {
	items: UserGetAllItemResponseDto[];
} & PaginationResponse;

export { type UserGetAllResponseDto };
