import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra, rejectWithValue }) => {
	const { userApi } = extra;

	try {
		return await userApi.getAll();
	} catch (error) {
		return rejectWithValue({
			message: (error as Error).message,
		});
	}
});

export { loadAll };
