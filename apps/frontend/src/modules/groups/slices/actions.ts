import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import {
	type GroupCreateRequestDto,
	type GroupCreateResponseDto,
	type GroupGetAllResponseDto,
	type GroupUpdateRequestDto,
	type GroupUpdateResponseDto,
	type UserGetAllQueryParameters,
} from "../libs/types/types.js";
import { name as sliceName } from "./group.slice.js";

const loadAll = createAsyncThunk<
	GroupGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.getAll(query);
});

const deleteById = createAsyncThunk<boolean, { id: number }, AsyncThunkConfig>(
	`${sliceName}/delete-by-id`,
	async ({ id }, { dispatch, extra }) => {
		const { groupApi, toastNotifier } = extra;

		const isDeleted = await groupApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.GROUP_DELETE_SUCCESS);
			void dispatch(authActions.getAuthenticatedUser());
		}

		return isDeleted;
	},
);

const loadUsers = createAsyncThunk<
	UserGetAllResponseDto,
	UserGetAllQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-users`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const create = createAsyncThunk<
	GroupCreateResponseDto,
	GroupCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { dispatch, extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_CREATE_SUCCESS);
	void dispatch(authActions.getAuthenticatedUser());

	return response;
});

const update = createAsyncThunk<
	GroupUpdateResponseDto,
	{ id: number; payload: GroupUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { dispatch, extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.update(id, payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_UPDATE_SUCCESS);
	void dispatch(authActions.getAuthenticatedUser());

	return response;
});

export { create, deleteById, loadAll, loadUsers, update };
