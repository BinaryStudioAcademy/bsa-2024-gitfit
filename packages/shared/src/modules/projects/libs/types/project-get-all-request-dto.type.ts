import { type PaginationQueryParameters } from "src/libs/types/types.js";

type ProjectGetAllRequestDto = {
	name: string;
} & PaginationQueryParameters;

export { type ProjectGetAllRequestDto };
