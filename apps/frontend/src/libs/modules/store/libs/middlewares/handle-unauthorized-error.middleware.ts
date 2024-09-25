import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { ExceptionName } from "~/libs/modules/http/http.js";
import {
	type AppDispatch,
	type RootState,
} from "~/libs/modules/store/store.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { actions as authActions } from "~/modules/auth/auth.js"; // Assuming toastNotifier is available here

const handleUnauthorizedError = (): Middleware<
	object,
	RootState,
	AppDispatch
> => {
	return ({ dispatch }) => {
		return (next) => (action) => {
			if (
				isRejected(action) &&
				action.error.name === ExceptionName.UNAUTHORIZED
			) {
				const isLoginAttempt =
					action.meta.arg &&
					typeof action.meta.arg === "object" &&
					"password" in action.meta.arg;

				if (isLoginAttempt) {
					toastNotifier.showError("Invalid credentials.");
				} else {
					void dispatch(authActions.logout());
				}

				return;
			}

			return next(action);
		};
	};
};

export { handleUnauthorizedError };
