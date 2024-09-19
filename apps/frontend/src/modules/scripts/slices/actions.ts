import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/enums/enums.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { name as sliceName } from "./scripts.slice.js";

const copyToClipboard = createAsyncThunk<string, string, AsyncThunkConfig>(
	`${sliceName}/copy-to-clipboard`,
	async (script, { extra }) => {
		const { toastNotifier } = extra;

		await navigator.clipboard.writeText(script);
		toastNotifier.showSuccess(NotificationMessage.SCRIPT_COPY_SUCCESS);

		return script;
	},
);

export { copyToClipboard };
