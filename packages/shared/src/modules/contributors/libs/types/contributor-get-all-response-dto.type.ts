import { type ContributorGetAllItemResponseDto } from "./contributor-get-all-item-response-dto.type.js";

type ContributorGetAllResponseDto = {
	items: ContributorGetAllItemResponseDto[];
	totalItems: number;
};

export { type ContributorGetAllResponseDto };
