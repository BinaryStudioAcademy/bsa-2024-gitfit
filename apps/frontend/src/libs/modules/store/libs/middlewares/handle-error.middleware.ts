import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { notifier } from "~/libs/modules/toast-notifier/toast-notifier.js";

const handleError: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			notifier.showError(action.error.message ?? "Unexpected error");
		}

		return next(action);
	};
};

export { handleError };
