import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { configureGroupUsers, deleteById, loadAll, update } from "./actions.js";

type EntityState<T> = {
	dataStatus: ValueOf<typeof DataStatus>;
	items: T[];
	totalCount: number;
};

type State = {
	groups: EntityState<GroupGetAllItemResponseDto>;
	users: EntityState<UserGetAllItemResponseDto>;
};

const initialState: State = {
	groups: {
		dataStatus: DataStatus.IDLE,
		items: [],
		totalCount: 0,
	},
	users: {
		dataStatus: DataStatus.IDLE,
		items: [],
		totalCount: 0,
	},
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(configureGroupUsers.pending, (state) => {
			state.users.dataStatus = DataStatus.PENDING;
		});

		builder.addCase(configureGroupUsers.fulfilled, (state, action) => {
			state.users.items = action.payload.items;
			state.users.totalCount = action.payload.totalItems;
			state.users.dataStatus = DataStatus.FULFILLED;
		});

		builder.addCase(configureGroupUsers.rejected, (state) => {
			state.users.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAll.pending, (state) => {
			state.groups.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.groups.items = action.payload.items;
			state.groups.totalCount = action.payload.totalItems;
			state.groups.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.groups.items = [];
			state.groups.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(update.pending, (state) => {
			state.groups.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			const updatedGroup = action.payload;
			state.groups.items = state.groups.items.map((project) =>
				project.id === updatedGroup.id ? updatedGroup : project,
			);

			state.groups.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(update.rejected, (state) => {
			state.groups.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(deleteById.fulfilled, (state, action) => {
			const deletedGroupId = action.meta.arg;
			state.groups.items = state.groups.items.filter(
				(group) => group.id !== deletedGroupId,
			);
			state.groups.totalCount -= 1;
		});
		builder.addCase(deleteById.fulfilled, (state, action) => {
			const deletedGroupId = action.meta.arg;
			state.groups.items = state.groups.items.filter(
				(group) => group.id !== deletedGroupId,
			);
			state.groups.totalCount -= 1;
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
