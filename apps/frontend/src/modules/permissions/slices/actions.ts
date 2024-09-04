import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type PermissionGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./permission.slice.js";

const loadPermissions = createAsyncThunk<
	PermissionGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-permissions`, (_, { extra }) => {
	const { permissionsApi } = extra;

	return permissionsApi.getPermissions();
});

export { loadPermissions };
