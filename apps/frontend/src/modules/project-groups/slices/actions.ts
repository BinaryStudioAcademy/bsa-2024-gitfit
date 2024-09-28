import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserGetAllQueryParameters,
	type UserGetAllResponseDto,
} from "~/modules/users/users.js";

import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllItemResponseDto,
	type ProjectGroupGetAllResponseDto,
	type ProjectGroupPatchRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./project-group.slice.js";

const loadUsers = createAsyncThunk<
	UserGetAllResponseDto,
	UserGetAllQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-users`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const loadAllByProjectId = createAsyncThunk<
	ProjectGroupGetAllResponseDto,
	{ projectId: string; query: PaginationQueryParameters },
	AsyncThunkConfig
>(`${sliceName}/load-all`, async ({ projectId, query }, { extra }) => {
	const { projectGroupApi } = extra;

	return await projectGroupApi.getAllByProjectId(projectId, query);
});

const deleteById = createAsyncThunk<boolean, { id: number }, AsyncThunkConfig>(
	`${sliceName}/delete-by-id`,
	async ({ id }, { dispatch, extra }) => {
		const { projectGroupApi, toastNotifier } = extra;

		const isDeleted = await projectGroupApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(
				NotificationMessage.PROJECT_GROUP_DELETE_SUCCESS,
			);
			void dispatch(authActions.getAuthenticatedUser());
		}

		return isDeleted;
	},
);

const create = createAsyncThunk<
	ProjectGroupGetAllItemResponseDto,
	ProjectGroupCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { dispatch, extra }) => {
	const { projectGroupApi, toastNotifier } = extra;

	const response = await projectGroupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_GROUP_CREATE_SUCCESS);
	void dispatch(authActions.getAuthenticatedUser());

	return response;
});

const patch = createAsyncThunk<
	ProjectGroupGetAllItemResponseDto,
	{ id: number; payload: ProjectGroupPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { dispatch, extra }) => {
	const { projectGroupApi, toastNotifier } = extra;

	const response = await projectGroupApi.patch(id, payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_GROUP_UPDATE_SUCCESS);
	void dispatch(authActions.getAuthenticatedUser());

	return response;
});

export { create, deleteById, loadAllByProjectId, loadUsers, patch };
