import { type UsePaginationValues } from "./use-pagination-values.type.js";

type UsePagination = (parameters: {
	queryParameterPrefix: string;
	totalItemsCount: number;
}) => UsePaginationValues;

export { type UsePagination };
