import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type ContributorGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./contributor.slice.js";

const loadAll = createAsyncThunk<
	ContributorGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { contributorApi } = extra;

	return await contributorApi.getAll();
});

const loadAllByProjectId = createAsyncThunk<
	ContributorGetAllResponseDto,
	string,
	AsyncThunkConfig
>(`${sliceName}/load-all-by-project-id`, async (projectId, { extra }) => {
	const { contributorApi } = extra;

	return await contributorApi.getAllByProjectId(projectId);
});

export { loadAll, loadAllByProjectId };
