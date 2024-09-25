import { type PaginationQueryParameters } from "../../../../libs/types/types.js";

type ContributorGetAllRequestDto = {
	projectId?: number | undefined;
} & Partial<PaginationQueryParameters>;

export { type ContributorGetAllRequestDto };
