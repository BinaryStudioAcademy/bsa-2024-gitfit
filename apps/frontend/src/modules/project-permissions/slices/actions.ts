import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type ProjectPermissionsGetAllResponseDto } from "~/modules/project-permissions/project-permissions.js";

import { name as sliceName } from "./project-permissions.slice.js";

const loadAll = createAsyncThunk<
	ProjectPermissionsGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { projectPermissionsApi } = extra;

	return await projectPermissionsApi.getAll();
});

export { loadAll };
