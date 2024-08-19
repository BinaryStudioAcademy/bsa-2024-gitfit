import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const signUp = createAsyncThunk<
	UserSignUpResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (payload, { extra, rejectWithValue }) => {
	const { authApi } = extra;

	try {
		return await authApi.signUp(payload);
	} catch (error) {
		return rejectWithValue({
			message: (error as Error).message,
		});
	}
});

export { signUp };
