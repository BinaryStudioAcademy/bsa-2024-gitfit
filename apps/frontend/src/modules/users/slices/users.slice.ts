import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { loadAll, updateProfile } from "./actions.js";

type State = {
	modal: {
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
	modal: {
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
		builder.addCase(loadAll.pending, (state, action) => {
			if (action.meta.arg.isModal) {
				state.modal.dataStatus = DataStatus.PENDING;
			} else {
				state.users.dataStatus = DataStatus.PENDING;
			}
		});

		builder.addCase(loadAll.fulfilled, (state, action) => {
			if (action.meta.arg.isModal) {
				state.modal.data = action.payload.items;
				state.modal.totalCount = action.payload.totalItems;
				state.modal.dataStatus = DataStatus.FULFILLED;
			} else {
				state.users.data = action.payload.items;
				state.users.totalCount = action.payload.totalItems;
				state.users.dataStatus = DataStatus.FULFILLED;
			}
		});
		builder.addCase(loadAll.rejected, (state, action) => {
			if (action.meta.arg.isModal) {
				state.modal.dataStatus = DataStatus.REJECTED;
			} else {
				state.users.dataStatus = DataStatus.REJECTED;
			}
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
