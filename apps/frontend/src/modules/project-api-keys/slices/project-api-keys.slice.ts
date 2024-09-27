import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { copyToClipboard, create } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	generateKeyDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	generateKeyDataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.generateKeyDataStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.generateKeyDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.generateKeyDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(copyToClipboard.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(copyToClipboard.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(copyToClipboard.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "project-api-keys",
	reducers: {},
});

export { actions, name, reducer };
