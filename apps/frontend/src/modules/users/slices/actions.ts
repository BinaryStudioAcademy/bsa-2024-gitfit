import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserGetAllResponseDto,
	type UserInfoResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll();
});

const updateUser = createAsyncThunk<
	UserInfoResponseDto,
	{ id: number; userPayload: UserInfoResponseDto },
	AsyncThunkConfig
>(`${sliceName}/profile`, async ({ id, userPayload }, { extra }) => {
	const { userApi } = extra;

	return await userApi.update(id, userPayload);
});

export { loadAll, updateUser };
