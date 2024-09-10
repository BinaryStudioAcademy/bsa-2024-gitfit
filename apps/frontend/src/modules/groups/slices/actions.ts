import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";
import { actions as userActions } from "~/modules/users/users.js";

import {
	type GroupCreateRequestDto,
	type GroupCreateResponseDto,
	type GroupGetAllResponseDto,
	type GroupUpdateRequestDto,
	type GroupUpdateResponseDto,
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

const loadUsers = createAsyncThunk<
	UserGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-users`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const create = createAsyncThunk<
	GroupCreateResponseDto,
	{ payload: GroupCreateRequestDto; query: PaginationQueryParameters },
	AsyncThunkConfig
>(`${sliceName}/create`, async ({ payload, query }, { dispatch, extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_CREATE_SUCCESS);

	void dispatch(userActions.loadAll(query));

	return response;
});

const update = createAsyncThunk<
	GroupUpdateResponseDto,
	{ id: number; payload: GroupUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.update(id, payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_UPDATE_SUCCESS);

	return response;
});

export { create, loadAll, loadUsers, update };
