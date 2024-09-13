import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
	type ProjectApiKeyPatchRequestDto,
	type ProjectApiKeyPatchResponseDto,
} from "~/modules/project-api-keys/project-api-keys.js";
import { actions as projectActions } from "~/modules/projects/projects.js";

import { name as sliceName } from "./project-api-keys.slice.js";

const create = createAsyncThunk<
	ProjectApiKeyCreateResponseDto,
	ProjectApiKeyCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { dispatch, extra }) => {
	const { projectApiKeysApi, toastNotifier } = extra;
	const { projectId } = payload;

	const response = await projectApiKeysApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_API_KEY_CREATE_SUCCESS);

	void dispatch(projectActions.getById({ id: String(projectId) }));

	return response;
});

const patch = createAsyncThunk<
	ProjectApiKeyPatchResponseDto,
	ProjectApiKeyPatchRequestDto,
	AsyncThunkConfig
>(`${sliceName}/patch`, async (payload, { dispatch, extra }) => {
	const { projectApiKeysApi, toastNotifier } = extra;
	const { projectId } = payload;

	const response = await projectApiKeysApi.patch(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_API_KEY_UPDATE_SUCCESS);

	void dispatch(projectActions.getById({ id: String(projectId) }));

	return response;
});

export { create, patch };
