import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ActivityLogGetAllAnalyticsResponseDto,
	type ActivityLogQueryParameters,
} from "../libs/types/types.js";
import { name as sliceName } from "./activity.slice.js";

const loadAll = createAsyncThunk<
	ActivityLogGetAllAnalyticsResponseDto,
	ActivityLogQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { activityLogApi } = extra;

	return await activityLogApi.getAll(query);
});

export { loadAll };
