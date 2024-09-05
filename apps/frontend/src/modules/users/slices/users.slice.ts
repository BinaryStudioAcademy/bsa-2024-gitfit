import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { configureGroupUsers, loadAll, updateProfile } from "./actions.js";

type State = {
	groupUsers: {
		data: UserGetAllItemResponseDto[];
		dataStatus: ValueOf<typeof DataStatus>;
		totalCount: number;
	};
	updateProfileStatus: ValueOf<typeof DataStatus>;
	users: {
		data: UserGetAllItemResponseDto[];
		dataStatus: ValueOf<typeof DataStatus>;
		totalCount: number;
	};
};

const initialState: State = {
	groupUsers: {
		data: [],
		dataStatus: DataStatus.IDLE,
		totalCount: 0,
	},
	updateProfileStatus: DataStatus.IDLE,
	users: {
		data: [],
		dataStatus: DataStatus.IDLE,
		totalCount: 0,
	},
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(configureGroupUsers.pending, (state) => {
			state.groupUsers.dataStatus = DataStatus.PENDING;
		});

		builder.addCase(configureGroupUsers.fulfilled, (state, action) => {
			state.groupUsers.data = action.payload.items;
			state.groupUsers.totalCount = action.payload.totalItems;
			state.groupUsers.dataStatus = DataStatus.FULFILLED;
		});

		builder.addCase(configureGroupUsers.rejected, (state) => {
			state.groupUsers.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAll.pending, (state) => {
			state.users.dataStatus = DataStatus.PENDING;
		});

		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.users.data = action.payload.items;
			state.users.totalCount = action.payload.totalItems;
			state.users.dataStatus = DataStatus.FULFILLED;
		});

		builder.addCase(loadAll.rejected, (state) => {
			state.users.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(updateProfile.pending, (state) => {
			state.updateProfileStatus = DataStatus.PENDING;
		});
		builder.addCase(updateProfile.fulfilled, (state) => {
			state.updateProfileStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateProfile.rejected, (state) => {
			state.updateProfileStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
