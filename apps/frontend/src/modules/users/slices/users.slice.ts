import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { loadAll, loadAllModal, updateProfile } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	modalDataStatus: ValueOf<typeof DataStatus>;
	updateProfileStatus: ValueOf<typeof DataStatus>;
	users: UserGetAllItemResponseDto[];
	usersModal: UserGetAllItemResponseDto[];
	usersModalTotalCount: number;
	usersTotalCount: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	modalDataStatus: DataStatus.IDLE,
	updateProfileStatus: DataStatus.IDLE,
	users: [],
	usersModal: [],
	usersModalTotalCount: 0,
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

		builder.addCase(loadAllModal.pending, (state) => {
			state.modalDataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllModal.fulfilled, (state, action) => {
			state.usersModal = action.payload.items;
			state.usersModalTotalCount = action.payload.totalItems;
			state.modalDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAllModal.rejected, (state) => {
			state.modalDataStatus = DataStatus.REJECTED;
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
