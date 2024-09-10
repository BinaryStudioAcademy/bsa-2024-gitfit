import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type PermissionGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./permission.slice.js";

const loadAll = createAsyncThunk<
	PermissionGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { permissionApi } = extra;

	return await permissionApi.getAll();
});

export { loadAll };
