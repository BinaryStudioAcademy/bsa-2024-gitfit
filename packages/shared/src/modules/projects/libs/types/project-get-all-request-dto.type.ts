import { type InfiniteScrollQueryParameters } from "src/libs/types/types.js";

type ProjectGetAllRequestDto = {
	name: string;
} & InfiniteScrollQueryParameters;

export { type ProjectGetAllRequestDto };
