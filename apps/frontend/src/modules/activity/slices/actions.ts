import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type ActivityLogGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./activity.slice.js";

const loadAll = createAsyncThunk<
	ActivityLogGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { activityLogApi } = extra;

	return await activityLogApi.getAll();
});

export { loadAll };
