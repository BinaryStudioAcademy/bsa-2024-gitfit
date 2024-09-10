import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ProjectGroupGetAllItemResponseDto } from "../libs/types/types.js";
import { create, loadAllByProjectId } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	projectGroupCreateStatus: ValueOf<typeof DataStatus>;
	projectGroups: ProjectGroupGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	projectGroupCreateStatus: DataStatus.IDLE,
	projectGroups: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAllByProjectId.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllByProjectId.fulfilled, (state, action) => {
			state.projectGroups = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAllByProjectId.rejected, (state) => {
			state.projectGroups = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(create.pending, (state) => {
			state.projectGroupCreateStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.projectGroups = [action.payload, ...state.projectGroups];
			state.projectGroupCreateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.projectGroupCreateStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "project-groups",
	reducers: {},
});

export { actions, name, reducer };
