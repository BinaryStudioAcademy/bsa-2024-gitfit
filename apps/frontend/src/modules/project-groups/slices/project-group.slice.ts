import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_CHANGED_COUNT } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type ProjectGroupGetAllItemResponseDto } from "../libs/types/types.js";
import {
	create,
	deleteById,
	loadAllByProjectId,
	loadUsers,
	patch,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	projectGroupCreateStatus: ValueOf<typeof DataStatus>;
	projectGroupDeleteStatus: ValueOf<typeof DataStatus>;
	projectGroups: ProjectGroupGetAllItemResponseDto[];
	projectGroupsTotalCount: number;
	projectGroupUpdateStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	projectGroupCreateStatus: DataStatus.IDLE,
	projectGroupDeleteStatus: DataStatus.IDLE,
	projectGroups: [],
	projectGroupsTotalCount: 0,
	projectGroupUpdateStatus: DataStatus.IDLE,
	users: [],
	usersDataStatus: DataStatus.IDLE,
	usersTotalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadUsers.pending, (state) => {
			state.usersDataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadUsers.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.usersTotalCount = action.payload.totalItems;
			state.usersDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadUsers.rejected, (state) => {
			state.usersDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAllByProjectId.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllByProjectId.fulfilled, (state, action) => {
			state.projectGroups = action.payload.items;
			state.projectGroupsTotalCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAllByProjectId.rejected, (state) => {
			state.projectGroups = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteById.pending, (state) => {
			state.projectGroupDeleteStatus = DataStatus.PENDING;
		});
		builder.addCase(deleteById.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			state.projectGroups = state.projectGroups.filter(
				(projectGroup) => projectGroup.id !== id,
			);
			state.projectGroupsTotalCount -= ITEMS_CHANGED_COUNT;
			state.projectGroupDeleteStatus = DataStatus.FULFILLED;
		});
		builder.addCase(deleteById.rejected, (state) => {
			state.projectGroupDeleteStatus = DataStatus.REJECTED;
		});
		builder.addCase(create.pending, (state) => {
			state.projectGroupCreateStatus = DataStatus.PENDING;
		});

		builder.addCase(create.fulfilled, (state, action) => {
			state.projectGroups = [action.payload, ...state.projectGroups];
			state.projectGroupsTotalCount += ITEMS_CHANGED_COUNT;
			state.projectGroupCreateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.projectGroupCreateStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.projectGroupUpdateStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			const updatedProjectGroup = action.payload;
			state.projectGroups = state.projectGroups.map((projectGroup) =>
				projectGroup.id === updatedProjectGroup.id
					? updatedProjectGroup
					: projectGroup,
			);

			state.projectGroupUpdateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.projectGroupUpdateStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "project-groups",
	reducers: {},
});

export { actions, name, reducer };
