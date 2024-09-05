import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type GroupGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./group.slice.js";

const loadAll = createAsyncThunk<
	GroupGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { groupApi } = extra;

	return await groupApi.getAll();
});

const deleteById = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-by-id`,
	async (id, { extra }) => {
		const { groupApi, toastNotifier } = extra;

		const isDeleted = await groupApi.deleteById(id);

		if (isDeleted) {
			toastNotifier.showSuccess(NotificationMessage.SUCCESS_GROUP_DELETE);
		}

		return isDeleted;
	},
);

export { deleteById, loadAll };
