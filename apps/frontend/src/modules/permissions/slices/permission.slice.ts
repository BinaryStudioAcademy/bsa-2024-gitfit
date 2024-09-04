import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PermissionGetAllResponseDto } from "../libs/types/types.js";
import { loadPermissions } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	permissions: PermissionGetAllResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	permissions: {
		items: [],
	},
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
	},
	initialState,
	name: "permissons",
	reducers: {},
});

export { actions, name, reducer };
