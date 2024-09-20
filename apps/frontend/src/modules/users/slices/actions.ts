import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserGetAllQueryParameters,
	type UserGetAllResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const deleteById = createAsyncThunk<boolean, { id: number }, AsyncThunkConfig>(
	`${sliceName}/delete-by-id`,
	async ({ id }, { dispatch, extra }) => {
		const { toastNotifier, userApi } = extra;

		const isDeleted = await userApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.USER_DELETE_SUCCESS);
			void dispatch(authActions.getAuthenticatedUser());
		}

		return isDeleted;
	},
);

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	UserGetAllQueryParameters,
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

	toastNotifier.showSuccess(NotificationMessage.PROFILE_UPDATE_SUCCESS);

	return user;
});

export { deleteById, loadAll, updateProfile };
