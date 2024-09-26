import { isRejected, type Middleware } from "@reduxjs/toolkit";

import { ExceptionName } from "~/libs/modules/http/http.js";
import {
	type AppDispatch,
	type RootState,
} from "~/libs/modules/store/store.js";
import { actions as authActions } from "~/modules/auth/auth.js";

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
				if (isRejected(authActions.signIn)(action)) {
					return next(action);
				}

				void dispatch(authActions.logout());

				return;
			}

			return next(action);
		};
	};
};

export { handleUnauthorizedError };
