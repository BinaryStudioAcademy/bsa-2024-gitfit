import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
} from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const getById = createAsyncThunk<
	ProjectGetAllItemResponseDto,
	{ id: string },
	AsyncThunkConfig
>(`${sliceName}/getById`, async (payload, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getById(payload);
});

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	string | undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll(query);
});

const create = createAsyncThunk<
	ProjectGetAllItemResponseDto,
	ProjectCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	const response = await projectApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_CREATE_SUCCESS);

	return response;
});

export { create, getById, loadAll };
