import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

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

export { signUp };
