import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_CHANGED_COUNT } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ActivityLogGetAllItemAnalyticsResponseDto } from "~/modules/activity/activity.js";
import { type ContributorGetAllItemResponseDto } from "~/modules/contributors/contributors.js";
import { actions as projectApiKeyActions } from "~/modules/project-api-keys/project-api-keys.js";
import {
	type ProjectGetAllItemResponseDto,
	type ProjectGetByIdResponseDto,
} from "~/modules/projects/projects.js";

import { FIRST_PAGE } from "../libs/constants/constants.js";
import {
	create,
	deleteById,
	getById,
	loadAll,
	loadAllContributorsActivityByProjectId,
	loadAllContributorsByProjectId,
	patch,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	project: null | ProjectGetByIdResponseDto;
	projectContributors: ContributorGetAllItemResponseDto[];
	projectContributorsActivity: ActivityLogGetAllItemAnalyticsResponseDto[];
	projectContributorsStatus: ValueOf<typeof DataStatus>;
	projectCreateStatus: ValueOf<typeof DataStatus>;
	projectDeleteStatus: ValueOf<typeof DataStatus>;
	projectPatchStatus: ValueOf<typeof DataStatus>;
	projects: ProjectGetAllItemResponseDto[];
	projectStatus: ValueOf<typeof DataStatus>;
	projectsTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	project: null,
	projectContributors: [],
	projectContributorsActivity: [],
	projectContributorsStatus: DataStatus.IDLE,
	projectCreateStatus: DataStatus.IDLE,
	projectDeleteStatus: DataStatus.IDLE,
	projectPatchStatus: DataStatus.IDLE,
	projects: [],
	projectStatus: DataStatus.IDLE,
	projectsTotalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.projectStatus = DataStatus.PENDING;
			state.projectDeleteStatus = DataStatus.IDLE;
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
			const { items, totalItems } = action.payload;
			const { page } = action.meta.arg;

			state.projects =
				page === FIRST_PAGE ? items : [...state.projects, ...items];
			state.projectsTotalCount = totalItems;
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
			state.projectsTotalCount += ITEMS_CHANGED_COUNT;
		});
		builder.addCase(create.rejected, (state) => {
			state.projectCreateStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.projectPatchStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			const updatedProject = action.payload;
			state.projects = state.projects.map((project) =>
				project.id === updatedProject.id ? updatedProject : project,
			);

			state.projectPatchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.projectPatchStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteById.fulfilled, (state, action) => {
			const deletedProjectId = action.meta.arg;
			state.projects = state.projects.filter(
				(project) => project.id !== deletedProjectId,
			);
			state.projectsTotalCount -= ITEMS_CHANGED_COUNT;
			state.projectDeleteStatus = DataStatus.FULFILLED;
		});
		builder.addCase(projectApiKeyActions.create.fulfilled, (state, action) => {
			if (state.project) {
				state.project.apiKey = action.payload.apiKey;
			}
		});
		builder.addCase(loadAllContributorsByProjectId.pending, (state) => {
			state.projectContributorsStatus = DataStatus.PENDING;
		});
		builder.addCase(
			loadAllContributorsByProjectId.fulfilled,
			(state, action) => {
				state.projectContributors = action.payload.items;
				state.projectContributorsStatus = DataStatus.FULFILLED;
			},
		);
		builder.addCase(loadAllContributorsByProjectId.rejected, (state) => {
			state.projectContributors = [];
			state.projectContributorsStatus = DataStatus.REJECTED;
		});
		builder.addCase(
			loadAllContributorsActivityByProjectId.fulfilled,
			(state, action) => {
				state.projectContributorsActivity = action.payload.items;
			},
		);
		builder.addCase(
			loadAllContributorsActivityByProjectId.rejected,
			(state) => {
				state.projectContributorsActivity = [];
			},
		);
	},
	initialState,
	name: "projects",
	reducers: {},
});

export { actions, name, reducer };
