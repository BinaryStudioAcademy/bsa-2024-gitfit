import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { create, loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groupCreateStatus: ValueOf<typeof DataStatus>;
	groups: GroupGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groupCreateStatus: DataStatus.IDLE,
	groups: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.groups = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(create.pending, (state) => {
			state.groupCreateStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.groups = [action.payload, ...state.groups];
			state.groupCreateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.groupCreateStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
