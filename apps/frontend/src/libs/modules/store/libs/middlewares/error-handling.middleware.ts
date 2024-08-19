import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { type AsyncThunkRejectValue } from "~/libs/types/types.js";

// eslint-disable-next-line unicorn/consistent-function-scoping
const middleware: Middleware = () => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		const rejectedValue = action.payload as AsyncThunkRejectValue;
		toast.error(rejectedValue.message);
	}

	return next(action);
};

export { middleware };
