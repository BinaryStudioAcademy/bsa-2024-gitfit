import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectCreateRequestDto,
	type ProjectCreateResponseDto,
	type ProjectGetAllResponseDto,
} from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll();
});

const create = createAsyncThunk<
	ProjectCreateResponseDto,
	ProjectCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.create(payload);
});

export { create, loadAll };
