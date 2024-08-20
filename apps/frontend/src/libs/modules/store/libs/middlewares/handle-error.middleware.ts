import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";

type Parameters = {
	toastNotifier: ToastNotifier;
};

const handleError = ({ toastNotifier }: Parameters): Middleware => {
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
