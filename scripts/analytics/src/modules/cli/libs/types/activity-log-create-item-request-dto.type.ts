import { type CommitStatistics } from "./commit-statistics.type.js";

type ActivityLogCreateItemRequestDto = {
	date: string;
	items: CommitStatistics[];
};

export { type ActivityLogCreateItemRequestDto };
