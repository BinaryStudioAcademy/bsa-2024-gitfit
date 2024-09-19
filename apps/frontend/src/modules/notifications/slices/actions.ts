import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type NotificationGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./notification.slice.js";

const loadAll = createAsyncThunk<
	NotificationGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { notificationApi } = extra;

	return await notificationApi.getAll();
});

export { loadAll };
