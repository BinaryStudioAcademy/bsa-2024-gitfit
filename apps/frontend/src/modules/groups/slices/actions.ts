import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import {
	type GroupGetAllResponseDto,
	type GroupUpdateRequestDto,
	type GroupUpdateResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./group.slice.js";

const configureGroupUsers = createAsyncThunk<
	UserGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/configure-group-users`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const loadAll = createAsyncThunk<
	GroupGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.getAll(query);
});

const update = createAsyncThunk<
	GroupUpdateResponseDto,
	{ id: number; payload: GroupUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.update(id, payload);
});

export { configureGroupUsers, loadAll, update };
