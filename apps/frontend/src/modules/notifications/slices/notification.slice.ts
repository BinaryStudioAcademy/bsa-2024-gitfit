import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type NotificationGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	notifications: NotificationGetAllItemResponseDto[];
	notificationsTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	notifications: [],
	notificationsTotalCount: 1,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.notifications = action.payload.items;
			state.notificationsTotalCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.notifications = [];
			state.notificationsTotalCount = 1;
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "notifications",
	reducers: {},
});

export { actions, name, reducer };
