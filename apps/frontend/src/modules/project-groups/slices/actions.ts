import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllItemResponseDto,
	type ProjectGroupGetAllResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./project-group.slice.js";

const loadAllByProjectId = createAsyncThunk<
	ProjectGroupGetAllResponseDto,
	string,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (parameters, { extra }) => {
	const { projectGroupApi } = extra;

	return await projectGroupApi.getAllByProjectId({ projectId: parameters });
});

const create = createAsyncThunk<
	ProjectGroupGetAllItemResponseDto,
	ProjectGroupCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { projectGroupApi, toastNotifier } = extra;

	const response = await projectGroupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_GROUP_CREATE_SUCCESS);

	return response;
});

export { create, loadAllByProjectId };
