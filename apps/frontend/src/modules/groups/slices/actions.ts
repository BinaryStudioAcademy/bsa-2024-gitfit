import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import {
	type GroupCreateRequestDto,
	type GroupCreateResponseDto,
	type GroupGetAllResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./group.slice.js";

const loadAll = createAsyncThunk<
	GroupGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.getAll();
});

const configureGroupUsers = createAsyncThunk<
	UserGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/configure-group-users`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const create = createAsyncThunk<
	GroupCreateResponseDto,
	GroupCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_CREATE_SUCCESS);

	return response;
});

export { configureGroupUsers, create, loadAll };
