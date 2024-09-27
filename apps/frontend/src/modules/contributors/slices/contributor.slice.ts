import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_CHANGED_COUNT } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "../libs/types/types.js";
import {
	loadAll,
	loadAllWithoutPagination,
	merge,
	patch,
	split,
} from "./actions.js";

type State = {
	allContributors: ContributorGetAllItemResponseDto[];
	allContributorsStatus: ValueOf<typeof DataStatus>;
	allContributorsTotalCount: number;
	contributors: ContributorGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	mergeContributorsStatus: ValueOf<typeof DataStatus>;
	splitContributorsStatus: ValueOf<typeof DataStatus>;
	totalCount: number;
	updateContributorsStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	allContributors: [],
	allContributorsStatus: DataStatus.IDLE,
	allContributorsTotalCount: 0,
	contributors: [],
	dataStatus: DataStatus.IDLE,
	mergeContributorsStatus: DataStatus.IDLE,
	splitContributorsStatus: DataStatus.IDLE,
	totalCount: 0,
	updateContributorsStatus: DataStatus.IDLE,
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
		builder.addCase(loadAllWithoutPagination.pending, (state) => {
			state.allContributorsStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAllWithoutPagination.fulfilled, (state, action) => {
			state.allContributors = action.payload.items;
			state.allContributorsStatus = DataStatus.FULFILLED;
			state.allContributorsTotalCount = action.payload.totalItems;
		});
		builder.addCase(loadAllWithoutPagination.rejected, (state) => {
			state.allContributors = [];
			state.allContributorsStatus = DataStatus.REJECTED;
		});

		builder.addCase(merge.pending, (state) => {
			state.mergeContributorsStatus = DataStatus.PENDING;
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
				state.allContributorsTotalCount -= ITEMS_CHANGED_COUNT;
			}

			state.contributors = state.contributors.map((contributor) =>
				isSameContributor(contributor.id)
					? { ...contributor, ...action.payload }
					: contributor,
			);
			state.mergeContributorsStatus = DataStatus.FULFILLED;
		});
		builder.addCase(merge.rejected, (state) => {
			state.mergeContributorsStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.updateContributorsStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			state.contributors = state.contributors.map((contributor) =>
				contributor.id === action.payload.id
					? { ...contributor, ...action.payload }
					: contributor,
			);
			state.updateContributorsStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.updateContributorsStatus = DataStatus.REJECTED;
		});

		builder.addCase(split.pending, (state) => {
			state.splitContributorsStatus = DataStatus.PENDING;
		});
		builder.addCase(split.fulfilled, (state) => {
			state.splitContributorsStatus = DataStatus.FULFILLED;
		});
		builder.addCase(split.rejected, (state) => {
			state.splitContributorsStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "contributors",
	reducers: {},
});

export { actions, name, reducer };
