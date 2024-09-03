import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetPermissionItemResponseDto } from "~/modules/auth/auth.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	getAuthenticatedUser,
	loadPermissions,
	logout,
	signIn,
	signUp,
} from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
	permissions: null | UserGetPermissionItemResponseDto[];
};

const initialState: State = {
	authenticatedUser: null,
	dataStatus: DataStatus.IDLE,
	permissions: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAuthenticatedUser.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.permissions = null;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signUp.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadPermissions.fulfilled, (state, action) => {
			state.permissions = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadPermissions.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadPermissions.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.authenticatedUser = null;
			state.permissions = null;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(logout.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(logout.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addMatcher(
			isAnyOf(
				getAuthenticatedUser.fulfilled,
				signIn.fulfilled,
				signUp.fulfilled,
			),
			(state, action) => {
				state.authenticatedUser = action.payload;
			},
		);
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
