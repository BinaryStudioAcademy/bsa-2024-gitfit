import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as projectActions } from "~/modules/projects/projects.js";

import {
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllQueryParameters,
	type ContributorGetAllResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
	type ContributorSplitRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./contributor.slice.js";

const loadAll = createAsyncThunk<
	ContributorGetAllResponseDto,
	ContributorGetAllQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { contributorApi } = extra;

	return await contributorApi.getAll(query);
});

const loadAllWithoutPagination = createAsyncThunk<
	ContributorGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all-without-pagination`, async (_payload, { extra }) => {
	const { contributorApi } = extra;

	return await contributorApi.getAllWithoutPagination();
});

const merge = createAsyncThunk<
	ContributorGetAllItemResponseDto,
	{ id: number; payload: ContributorMergeRequestDto },
	AsyncThunkConfig
>(`${sliceName}/merge`, async ({ id, payload }, { extra }) => {
	const { contributorApi, toastNotifier } = extra;
	const response = await contributorApi.merge(id, payload);
	toastNotifier.showSuccess(NotificationMessage.CONTRIBUTOR_MERGE_SUCCESS);

	return response;
});

const split = createAsyncThunk<
	ContributorGetAllItemResponseDto,
	{ id: number; payload: ContributorSplitRequestDto },
	AsyncThunkConfig
>(`${sliceName}/split`, async ({ id, payload }, { extra }) => {
	const { contributorApi, toastNotifier } = extra;
	const response = await contributorApi.split(id, payload);
	toastNotifier.showSuccess(NotificationMessage.CONTRIBUTOR_SPLIT_SUCCESS);

	return response;
});

const patch = createAsyncThunk<
	ContributorPatchResponseDto,
	{ id: number; payload: ContributorPatchRequestDto; projectId?: number },
	AsyncThunkConfig
>(
	`${sliceName}/update`,
	async ({ id, payload, projectId }, { dispatch, extra }) => {
		const { contributorApi, toastNotifier } = extra;

		const response = await contributorApi.patch(id, payload);
		toastNotifier.showSuccess(NotificationMessage.CONTRIBUTOR_UPDATE_SUCCESS);

		if (projectId) {
			void dispatch(projectActions.loadAllContributorsByProjectId(projectId));
		}

		return response;
	},
);

export { loadAll, loadAllWithoutPagination, merge, patch, split };
