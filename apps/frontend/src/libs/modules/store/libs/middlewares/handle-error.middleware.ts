import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";

type Argument = {
	notifier: ToastNotifier;
};

const handleError = ({ notifier }: Argument): Middleware => {
	return () => {
		return (next) => (action) => {
			if (isRejected(action)) {
				notifier.showError(action.error.message ?? "Unexpected error");
			}

			return next(action);
		};
	};
};

export { handleError };
