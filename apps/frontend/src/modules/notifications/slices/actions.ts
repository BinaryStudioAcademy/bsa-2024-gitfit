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

const loadAllUnread = createAsyncThunk<
	Pick<NotificationGetAllResponseDto, "items">,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all-unread`, async (_, { extra }) => {
	const { notificationApi } = extra;

	return await notificationApi.getAllUnread();
});

const markAsRead = createAsyncThunk<boolean, { id: number }, AsyncThunkConfig>(
	`${sliceName}/mark-as-read`,
	async ({ id }, { extra }) => {
		const { notificationApi } = extra;

		return await notificationApi.markAsRead(id);
	},
);

export { loadAll, loadAllUnread, markAsRead };
