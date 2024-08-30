import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { getById, loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	project: null | ProjectGetAllItemResponseDto;
	projects: ProjectGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	project: null,
	projects: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.project = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.rejected, (state) => {
			state.project = null;
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.projects = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.projects = [];
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "projects",
	reducers: {},
});

export { actions, name, reducer };
