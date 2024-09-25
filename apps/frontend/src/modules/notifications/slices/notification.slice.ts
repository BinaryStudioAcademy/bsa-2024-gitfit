import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FIRST_PAGE } from "~/modules/projects/libs/constants/constants.js";

import { type NotificationGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll, loadUnreadCount, markAsRead } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	markAsReadStatus: ValueOf<typeof DataStatus>;
	notifications: NotificationGetAllItemResponseDto[];
	notificationsTotalCount: number;
	unreadDataStatus: ValueOf<typeof DataStatus>;
	unreadNotificationsCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	markAsReadStatus: DataStatus.IDLE,
	notifications: [],
	notificationsTotalCount: 0,
	unreadDataStatus: DataStatus.IDLE,
	unreadNotificationsCount: 0,
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

		builder.addCase(loadUnreadCount.pending, (state) => {
			state.unreadDataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadUnreadCount.fulfilled, (state, action) => {
			state.unreadNotificationsCount = action.payload;
			state.unreadDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadUnreadCount.rejected, (state) => {
			state.unreadNotificationsCount = initialState.unreadNotificationsCount;
			state.unreadDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(markAsRead.pending, (state) => {
			state.markAsReadStatus = DataStatus.PENDING;
		});
		builder.addCase(markAsRead.fulfilled, (state) => {
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
