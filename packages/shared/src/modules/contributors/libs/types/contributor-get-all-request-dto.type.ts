import { type PaginationQueryParameters } from "../../../../index.js";

type ContributorGetAllRequestDto = {
	contributorName?: string;
} & PaginationQueryParameters;

export { type ContributorGetAllRequestDto };
