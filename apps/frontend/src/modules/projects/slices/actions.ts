import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type ProjectGetAllResponseDto } from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	string | undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll(query);
});

export { loadAll };
