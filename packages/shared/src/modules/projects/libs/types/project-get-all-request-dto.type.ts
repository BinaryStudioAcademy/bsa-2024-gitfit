import { type PaginationQueryParameters } from "../../../../libs/types/types.js";

type ProjectGetAllRequestDto = {
	name: string;
} & PaginationQueryParameters;

export { type ProjectGetAllRequestDto };
