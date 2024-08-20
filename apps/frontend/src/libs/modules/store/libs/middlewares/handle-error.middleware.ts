import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { notifier } from "~/libs/modules/notifier/notifier.js";

const handleError: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			notifier.error(action.error.message);
		}

		return next(action);
	};
};

export { handleError };
