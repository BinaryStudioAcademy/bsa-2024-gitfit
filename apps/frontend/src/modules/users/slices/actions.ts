import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserGetAllResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
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

const updateProfile = createAsyncThunk<
	UserPatchResponseDto,
	{ id: number; payload: UserPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/profile`, async ({ id, payload }, { extra }) => {
	const { toastNotifier, userApi } = extra;

	const user = await userApi.patch(id, payload);
	toastNotifier.showSuccess(NotificationMessage.SUCCESS_PROFILE_UPDATE);

	return user;
});

export { loadAll, updateProfile };
