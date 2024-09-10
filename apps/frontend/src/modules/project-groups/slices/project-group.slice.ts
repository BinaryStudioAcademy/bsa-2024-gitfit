import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type ProjectGroupGetAllItemResponseDto } from "../libs/types/types.js";
import { create, loadAllByProjectId, loadUsers } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	projectGroupCreateStatus: ValueOf<typeof DataStatus>;
	projectGroups: ProjectGroupGetAllItemResponseDto[];
	projectGroupsTotalCount: number;
	users: UserGetAllItemResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	projectGroupCreateStatus: DataStatus.IDLE,
	projectGroups: [],
	projectGroupsTotalCount: 0,
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
