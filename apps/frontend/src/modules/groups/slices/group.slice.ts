import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll, update } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groups: GroupGetAllItemResponseDto[];
	groupsTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groups: [],
	groupsTotalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.groupsTotalCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.groups = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(update.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			const updatedGroup = action.payload;
			state.groups = state.groups.map((project) =>
				project.id === updatedGroup.id ? updatedGroup : project,
			);

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(update.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
