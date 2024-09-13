import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "~/modules/project-api-keys/project-api-keys.js";

import { name as sliceName } from "./project-api-keys.slice.js";

const create = createAsyncThunk<
	ProjectApiKeyCreateResponseDto,
	ProjectApiKeyCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { projectApiKeysApi, toastNotifier } = extra;

	const response = await projectApiKeysApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.PROJECT_API_KEY_CREATE_SUCCESS);

	return response;
});

export { create };
