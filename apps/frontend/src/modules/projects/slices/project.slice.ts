import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { create, getById, loadAll, update } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	project: null | ProjectGetAllItemResponseDto;
	projectCreateStatus: ValueOf<typeof DataStatus>;
	projects: ProjectGetAllItemResponseDto[];
	projectStatus: ValueOf<typeof DataStatus>;
	projectUpdateStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	project: null,
	projectCreateStatus: DataStatus.IDLE,
	projects: [],
	projectStatus: DataStatus.IDLE,
	projectUpdateStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.projectStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.project = action.payload;
			state.projectStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.rejected, (state) => {
			state.project = null;
			state.projectStatus = DataStatus.REJECTED;
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
		builder.addCase(create.pending, (state) => {
			state.projectCreateStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.projects = [action.payload, ...state.projects];
			state.projectCreateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.projectCreateStatus = DataStatus.REJECTED;
		});
		builder.addCase(update.pending, (state) => {
			state.projectUpdateStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			const updatedProject = action.payload;
			state.projects = state.projects.map((project) =>
				project.id === updatedProject.id ? updatedProject : project,
			);

			state.projectUpdateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(update.rejected, (state) => {
			state.projectUpdateStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "projects",
	reducers: {},
});

export { actions, name, reducer };
