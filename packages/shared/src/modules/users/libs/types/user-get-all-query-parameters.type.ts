import { type PaginationQueryParameters } from "../../../../index.js";

type UserGetAllQueryParameters = {
	name?: string | undefined;
} & PaginationQueryParameters;

export { type UserGetAllQueryParameters };
