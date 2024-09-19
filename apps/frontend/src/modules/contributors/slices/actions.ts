import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as projectActions } from "~/modules/projects/projects.js";

import {
	type ContributorGetAllResponseDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./contributor.slice.js";

const loadAll = createAsyncThunk<
	ContributorGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { contributorApi } = extra;

	return await contributorApi.getAll();
});

const patch = createAsyncThunk<
	ContributorPatchResponseDto,
	{ id: number; payload: ContributorPatchRequestDto; projectId?: string },
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

export { loadAll, patch };
