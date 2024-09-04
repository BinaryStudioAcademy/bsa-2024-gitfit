import { type PaginationResponseDto } from "../../../../libs/types/types.js";
import { type UserGetAllItemResponseDto } from "./user-get-all-item-response-dto.type.js";

type UserGetAllResponseDto = PaginationResponseDto<UserGetAllItemResponseDto>;

export { type UserGetAllResponseDto };
