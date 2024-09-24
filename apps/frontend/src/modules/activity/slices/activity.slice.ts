import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { type ActivityLogGetAllItemAnalyticsResponseDto } from "../libs/types/types.js";
import { loadAll, loadAllProjects } from "./actions.js";

type State = {
	activityLogs: ActivityLogGetAllItemAnalyticsResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	projects: ProjectGetAllItemResponseDto[];
};

const initialState: State = {
	activityLogs: [],
	dataStatus: DataStatus.IDLE,
	projects: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.activityLogs = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.activityLogs = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAllProjects.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllProjects.fulfilled, (state, action) => {
			state.projects = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAllProjects.rejected, (state) => {
			state.projects = [];
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "activity",
	reducers: {},
});

export { actions, name, reducer };
