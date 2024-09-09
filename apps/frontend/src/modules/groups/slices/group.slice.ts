import { createSlice } from "@reduxjs/toolkit";

import {
	FIRST_PAGE,
	ITEMS_DECREMENT,
} from "~/libs/components/table-pagination/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type GroupGetAllItemResponseDto } from "../libs/types/types.js";
import { deleteById, loadAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	groups: GroupGetAllItemResponseDto[];
	groupsTotalCount: number;
	page: number;
	pageSize: number;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	groups: [],
	groupsTotalCount: 0,
	page: 1,
	pageSize: 10,
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.groups = action.payload.items;
			state.groupsTotalCount = action.payload.totalItems;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.groups = [];
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(deleteById.fulfilled, (state, action) => {
			const deletedGroupId = action.meta.arg;
			state.groups = state.groups.filter(
				(group) => group.id !== deletedGroupId,
			);
			state.groupsTotalCount -= ITEMS_DECREMENT;

			const totalPages = Math.max(
				Math.ceil(state.groupsTotalCount / state.pageSize),
				FIRST_PAGE,
			);
			state.page = Math.min(state.page, totalPages);
		});
	},
	initialState,
	name: "groups",
	reducers: {},
});

export { actions, name, reducer };
