import { type PaginationQueryParameters } from "../../../../index.js";

type ContributorGetAllQueryParameters = {
	contributorName?: string;
} & PaginationQueryParameters;

export { type ContributorGetAllQueryParameters };
