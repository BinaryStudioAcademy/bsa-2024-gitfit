import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type GroupCreateRequestDto,
	type GroupCreateResponseDto,
	type GroupGetAllResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./group.slice.js";

const loadAll = createAsyncThunk<
	GroupGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.getAll();
});

const create = createAsyncThunk<
	GroupCreateResponseDto,
	GroupCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { groupApi, toastNotifier } = extra;

	const response = await groupApi.create(payload);

	toastNotifier.showSuccess(NotificationMessage.GROUP_CREATE_SUCCESS);

	return response;
});

export { create, loadAll };
