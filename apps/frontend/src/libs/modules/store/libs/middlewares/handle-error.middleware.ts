import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { type ExtraArguments } from "../types/types.js";

const handleError = ({ toastNotifier }: ExtraArguments): Middleware => {
	return () => {
		return (next) => (action) => {
			if (isRejected(action)) {
				toastNotifier.showError(action.error.message ?? "Unexpected error");
			}

			return next(action);
		};
	};
};

export { handleError };
