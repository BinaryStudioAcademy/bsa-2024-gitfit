import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { deleteById, loadAll, updateProfile } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	deleteStatus: ValueOf<typeof DataStatus>;
	updateProfileStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	deleteStatus: DataStatus.IDLE,
	updateProfileStatus: DataStatus.IDLE,
	users: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.users = action.payload.items;
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
		builder.addCase(deleteById.fulfilled, (state, action) => {
			state.deleteStatus = DataStatus.FULFILLED;
			state.users = state.users.filter((user) => user.id !== action.payload);
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
