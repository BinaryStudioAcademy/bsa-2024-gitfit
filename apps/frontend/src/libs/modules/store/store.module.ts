import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import { groupApi, reducer as groupsReducer } from "~/modules/groups/groups.js";
import {
	projectApi,
	reducer as projectsReducer,
} from "~/modules/projects/projects.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";

import { handleErrorMiddleware } from "./libs/middlewares/middlewares.js";
import { type ExtraArguments, type RootReducer } from "./libs/types/types.js";

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend(handleErrorMiddleware(this.extraArguments));
			},
			reducer: {
				auth: authReducer,
				groups: groupsReducer,
				projects: projectsReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			groupApi,
			projectApi,
			storage,
			toastNotifier,
			userApi,
		};
	}
}

export { Store };
