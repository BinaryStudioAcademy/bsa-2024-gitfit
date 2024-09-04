import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import {
	type AsyncThunkConfig,
	type PaginationQueryParameters,
} from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserGetAllResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const deleteById = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/delete`,
	async (userId, { extra }) => {
		const { toastNotifier, userApi } = extra;

		await userApi.delete(userId);
		toastNotifier.showSuccess(NotificationMessage.SUCCESS_USER_DELETE);

		return userId;
	},
);

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	PaginationQueryParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (query, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(query);
});

const updateProfile = createAsyncThunk<
	UserPatchResponseDto,
	{ id: number; payload: UserPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/profile`, async ({ id, payload }, { dispatch, extra }) => {
	const { toastNotifier, userApi } = extra;

	const user = await userApi.patch(id, payload);
	void dispatch(authActions.getAuthenticatedUser());

	toastNotifier.showSuccess(NotificationMessage.SUCCESS_PROFILE_UPDATE);

	return user;
});

export { deleteById, loadAll, updateProfile };
