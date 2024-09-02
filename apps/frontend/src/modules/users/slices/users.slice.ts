import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { loadAll, updateProfile } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	updateProfileStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
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
