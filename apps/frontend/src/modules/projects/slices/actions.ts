import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectFindRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
} from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const getById = createAsyncThunk<
	ProjectGetAllItemResponseDto,
	ProjectFindRequestDto,
	AsyncThunkConfig
>(`${sliceName}/getById`, async (payload, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getById(payload);
});

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll();
});

export { getById, loadAll };
