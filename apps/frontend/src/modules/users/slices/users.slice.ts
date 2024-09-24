import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_CHANGED_COUNT } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import {
	deleteById,
	deleteCurrentUser,
	loadAll,
	updateCurrentUserProfile,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	deleteStatus: ValueOf<typeof DataStatus>;
	updateProfileStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	deleteStatus: DataStatus.IDLE,
	updateProfileStatus: DataStatus.IDLE,
	users: [],
	usersTotalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});

		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.usersTotalCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});

		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteById.pending, (state) => {
			state.deleteStatus = DataStatus.PENDING;
		});
		builder.addCase(deleteById.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			state.users = state.users.filter((user) => user.id !== id);
			state.usersTotalCount -= ITEMS_CHANGED_COUNT;
			state.deleteStatus = DataStatus.FULFILLED;
		});
		builder.addCase(deleteById.rejected, (state) => {
			state.deleteStatus = DataStatus.REJECTED;
		});

		builder.addCase(updateCurrentUserProfile.pending, (state) => {
			state.updateProfileStatus = DataStatus.PENDING;
		});
		builder.addCase(updateCurrentUserProfile.fulfilled, (state) => {
			state.updateProfileStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateCurrentUserProfile.rejected, (state) => {
			state.updateProfileStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteCurrentUser.pending, (state) => {
			state.deleteStatus = DataStatus.PENDING;
		});
		builder.addCase(deleteCurrentUser.fulfilled, (state) => {
			state.usersTotalCount -= ITEMS_CHANGED_COUNT;
			state.deleteStatus = DataStatus.FULFILLED;
		});
		builder.addCase(deleteCurrentUser.rejected, (state) => {
			state.deleteStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
