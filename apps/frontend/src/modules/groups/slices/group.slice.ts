import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { create, loadAll, loadUsers, update } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groupCreateStatus: ValueOf<typeof DataStatus>;
	groups: GroupGetAllItemResponseDto[];
	groupsTotalCount: number;
	groupUpdateStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
	usersDataStatus: ValueOf<typeof DataStatus>;
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groupCreateStatus: DataStatus.IDLE,
	groups: [],
	groupsTotalCount: 0,
	groupUpdateStatus: DataStatus.IDLE,
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
			state.groupUpdateStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			const updatedGroup = action.payload;
			state.groups = state.groups.map((project) =>
				project.id === updatedGroup.id ? updatedGroup : project,
			);

			state.groupUpdateStatus = DataStatus.FULFILLED;
		});
		builder.addCase(update.rejected, (state) => {
			state.groupUpdateStatus = DataStatus.REJECTED;
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
