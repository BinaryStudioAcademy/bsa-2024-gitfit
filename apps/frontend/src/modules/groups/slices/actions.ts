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

const deleteById = createAsyncThunk<
	boolean,
	{
		groupQuery: PaginationQueryParameters;
		id: number;
		userQuery: PaginationQueryParameters;
	},
	AsyncThunkConfig
>(
	`${sliceName}/delete-by-id`,
	async ({ groupQuery, id, userQuery }, { dispatch, extra }) => {
		const { groupApi, toastNotifier } = extra;

		const isDeleted = await groupApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.GROUP_DELETE_SUCCESS);
			void dispatch(loadAll(groupQuery));
			void dispatch(userActions.loadAll(userQuery));
		}

		return isDeleted;
	},
);

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

export { create, deleteById, loadAll, loadUsers };
