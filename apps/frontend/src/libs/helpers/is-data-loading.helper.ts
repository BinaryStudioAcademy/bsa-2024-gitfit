import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

const isDataLoading = (dataStatus: ValueOf<typeof DataStatus>): boolean =>
	dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

export { isDataLoading };
