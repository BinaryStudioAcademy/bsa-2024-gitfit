import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectGetAllResponseDto,
	type ProjectUpdateRequestDto,
	type ProjectUpdateResponseDto,
} from "~/modules/projects/projects.js";

import { name as sliceName } from "./project.slice.js";

const loadAll = createAsyncThunk<
	ProjectGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { projectApi } = extra;

	return await projectApi.getAll();
});

const update = createAsyncThunk<
	ProjectUpdateResponseDto,
	{ id: number; payload: ProjectUpdateRequestDto },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ id, payload }, { extra }) => {
	const { projectApi, toastNotifier } = extra;

	toastNotifier.showSuccess(NotificationMessage.SUCCESS_PROJECT_UPDATE);

	return await projectApi.update(id, payload);
});

export { loadAll, update };
