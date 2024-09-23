import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_CHANGED_COUNT } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "../libs/types/types.js";
import { loadAll, merge, patch } from "./actions.js";

type State = {
	contributors: ContributorGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	totalCount: number;
};

const initialState: State = {
	contributors: [],
	dataStatus: DataStatus.IDLE,
	totalCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.contributors = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
			state.totalCount = action.payload.totalItems;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.contributors = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(merge.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(merge.fulfilled, (state, action) => {
			const { gitEmails: updatedGitEmails, id } = action.payload;

			const isSameContributor = (contributorId: number): boolean =>
				contributorId === id;

			const hasMatchingGitEmail = (
				contributorEmails: { email: string }[],
			): boolean =>
				contributorEmails.some((email) =>
					updatedGitEmails.some(
						(updatedEmail) => updatedEmail.email === email.email,
					),
				);

			const removedContributorId = state.contributors.find(
				(contributor) =>
					!isSameContributor(contributor.id) &&
					hasMatchingGitEmail(contributor.gitEmails),
			)?.id;

			if (removedContributorId) {
				state.contributors = state.contributors.filter(
					(contributor) => contributor.id !== removedContributorId,
				);
				state.totalCount -= ITEMS_CHANGED_COUNT;
			}

			state.contributors = state.contributors.map((contributor) =>
				isSameContributor(contributor.id)
					? { ...contributor, ...action.payload }
					: contributor,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(merge.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			state.contributors = state.contributors.map((contributor) =>
				contributor.id === action.payload.id
					? { ...contributor, ...action.payload }
					: contributor,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "contributors",
	reducers: {},
});

export { actions, name, reducer };
