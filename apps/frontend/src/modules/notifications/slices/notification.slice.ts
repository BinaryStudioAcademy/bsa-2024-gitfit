import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NotificationGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll, markAsRead } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	markAsReadStatus: ValueOf<typeof DataStatus>;
	notifications: NotificationGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	markAsReadStatus: DataStatus.IDLE,
	notifications: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.notifications = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.notifications = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(markAsRead.pending, (state) => {
			state.markAsReadStatus = DataStatus.PENDING;
		});
		builder.addCase(markAsRead.fulfilled, (state, action) => {
			const { id } = action.meta.arg;

			state.notifications = state.notifications.map((notification) =>
				notification.id === id
					? { ...notification, isRead: true }
					: notification,
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
