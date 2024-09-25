import { type PaginationQueryParameters } from "../../../../libs/types/types.js";

type ContributorGetAllRequestDto = {
	hasHidden?: boolean | undefined;
	projectId?: number | undefined;
} & Partial<PaginationQueryParameters>;

export { type ContributorGetAllRequestDto };
