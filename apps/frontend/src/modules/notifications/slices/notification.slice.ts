import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FIRST_PAGE } from "~/modules/projects/libs/constants/constants.js";

import { type NotificationGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll, loadAllUnread, markAsRead } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	markAsReadStatus: ValueOf<typeof DataStatus>;
	notifications: NotificationGetAllItemResponseDto[];
	notificationsTotalCount: number;
	unreadDataStatus: ValueOf<typeof DataStatus>;
	unreadNotifications: NotificationGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	markAsReadStatus: DataStatus.IDLE,
	notifications: [],
	notificationsTotalCount: 0,
	unreadDataStatus: DataStatus.IDLE,
	unreadNotifications: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			const { items, totalItems } = action.payload;
			const { page } = action.meta.arg;

			state.notifications =
				page === FIRST_PAGE ? items : [...state.notifications, ...items];
			state.notificationsTotalCount = totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.notifications = [];
			state.notificationsTotalCount = initialState.notificationsTotalCount;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAllUnread.pending, (state) => {
			state.unreadDataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllUnread.fulfilled, (state, action) => {
			state.unreadNotifications = action.payload.items;
			state.unreadDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAllUnread.rejected, (state) => {
			state.unreadNotifications = [];
			state.unreadDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(markAsRead.pending, (state) => {
			state.markAsReadStatus = DataStatus.PENDING;
		});
		builder.addCase(markAsRead.fulfilled, (state, action) => {
			const { notificationIds } = action.meta.arg;

			state.notifications = state.notifications.map((notification) =>
				notificationIds.includes(notification.id)
					? { ...notification, isRead: true }
					: notification,
			);

			state.unreadNotifications = state.unreadNotifications.filter(
				(notification) => !notificationIds.includes(notification.id),
			);

			state.markAsReadStatus = DataStatus.FULFILLED;
		});
		builder.addCase(markAsRead.rejected, (state) => {
			state.markAsReadStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "notifications",
	reducers: {},
});

export { actions, name, reducer };
