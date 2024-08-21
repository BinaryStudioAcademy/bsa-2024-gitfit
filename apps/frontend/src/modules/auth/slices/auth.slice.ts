import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../libs/types/types.js";
import { getAuthenticatedUser, signUp } from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	authenticatedUser: null,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signUp.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addMatcher(
			isAnyOf(getAuthenticatedUser.pending, signUp.pending),
			(state) => {
				state.dataStatus = DataStatus.PENDING;
			},
		);

		builder.addMatcher(
			isAnyOf(getAuthenticatedUser.fulfilled, signUp.fulfilled),
			(state, action) => {
				state.authenticatedUser = action.payload;
				state.dataStatus = DataStatus.FULFILLED;
			},
		);
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
