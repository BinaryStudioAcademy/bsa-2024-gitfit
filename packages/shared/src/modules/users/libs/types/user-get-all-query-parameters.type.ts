import { type PaginationQueryParameters } from "../../../../index.js";

type UserGetAllQueryParameters = {
	name?: string;
} & PaginationQueryParameters;

export { type UserGetAllQueryParameters };
