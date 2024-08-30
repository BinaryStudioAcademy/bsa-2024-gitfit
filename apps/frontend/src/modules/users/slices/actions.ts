import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserGetAllResponseDto } from "~/modules/users/users.js";

import { type PaginationParameters } from "../libs/types/types.js";
import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	UserGetAllResponseDto,
	PaginationParameters,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (paging, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll(paging);
});

export { loadAll };
