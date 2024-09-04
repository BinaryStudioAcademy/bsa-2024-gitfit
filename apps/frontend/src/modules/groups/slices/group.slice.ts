import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groups: GroupGetAllItemResponseDto[];
	totalGroupsCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groups: [],
	totalGroupsCount: 1,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.totalGroupsCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.groups = [];
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
