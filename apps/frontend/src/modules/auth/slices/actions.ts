import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./auth.slice.js";

const signIn = createAsyncThunk<
	UserAuthResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (payload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signIn(payload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const getAuthenticatedUser = createAsyncThunk<
	null | UserAuthResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_payload, { extra }) => {
	const { authApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);

	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await authApi.getAuthenticatedUser();
});

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (payload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signUp(payload);
	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const logout = createAsyncThunk<undefined, undefined, AsyncThunkConfig>(
	`${sliceName}/logout`,
	async (_payload, { extra }): Promise<undefined> => {
		const { storage } = extra;
		await storage.drop(StorageKey.TOKEN);
	},
);

export { getAuthenticatedUser, logout, signIn, signUp };
