import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
} from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const getById = createAsyncThunk<
	ProjectGetByIdResponseDto,
	{ id: string },
	AsyncThunkConfig
>(`${sliceName}/getById`, async (payload, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getById(payload);
});

const loadAll = createAsyncThunk<
	{ page: number } & ProjectGetAllResponseDto,
	ProjectGetAllRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { projectApi } = extra;

	const result = await projectApi.getAll(query);

	return {
		...result,
		page: query.page,
	};
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

const patch = createAsyncThunk<
	ProjectPatchResponseDto,
	{ id: number; payload: ProjectPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	const updatedProject = await projectApi.patch(id, payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_UPDATE_SUCCESS);

	return updatedProject;
});

const deleteById = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/deleteById`,
	async (id, { extra }) => {
		const { projectApi, toastNotifier } = extra;

		const isDeleted = await projectApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.PROJECT_DELETE_SUCCESS);
		}

		return isDeleted;
	},
);

export { create, deleteById, getById, loadAll, patch };
