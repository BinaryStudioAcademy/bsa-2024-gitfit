import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
	type ProjectUpdateRequestDto,
	type ProjectUpdateResponseDto,
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
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll();
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

const update = createAsyncThunk<
	ProjectUpdateResponseDto,
	{ id: number; payload: ProjectUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	const updatedProject = await projectApi.update(id, payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_UPDATE_SUCCESS);

	return updatedProject;
});

export { create, getById, loadAll, update };
