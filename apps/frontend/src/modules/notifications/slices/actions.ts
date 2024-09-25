import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";

import { type NotificationGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./notification.slice.js";

const loadAll = createAsyncThunk<
	NotificationGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { notificationApi } = extra;

	return await notificationApi.getAll(query);
});

const loadUnreadCount = createAsyncThunk<number, undefined, AsyncThunkConfig>(
	`${sliceName}/load-unread-count`,
	async (_, { extra }) => {
		const { notificationApi } = extra;

		return await notificationApi.getUnreadCount();
	},
);

const markAsRead = createAsyncThunk<boolean, undefined, AsyncThunkConfig>(
	`${sliceName}/mark-as-read`,
	async (_, { extra }) => {
		const { notificationApi } = extra;

		return await notificationApi.markAsRead();
	},
);

export { loadAll, loadUnreadCount, markAsRead };
