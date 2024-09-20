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
import {
	activityLogApi,
	reducer as activityLogReducer,
} from "~/modules/activity/activity.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import {
	contributorApi,
	reducer as contributorsReducer,
} from "~/modules/contributors/contributors.js";
import { groupApi, reducer as groupsReducer } from "~/modules/groups/groups.js";
import {
	notificationApi,
	reducer as notificationsReducer,
} from "~/modules/notifications/notifications.js";
import {
	permissionApi,
	reducer as permissionReducer,
} from "~/modules/permissions/permissions.js";
import {
	projectApiKeysApi,
	reducer as projectApiKeysReducer,
} from "~/modules/project-api-keys/project-api-keys.js";
import {
	projectGroupApi,
	reducer as projectGroupsReducer,
} from "~/modules/project-groups/project-groups.js";
import {
	projectPermissionsApi,
	reducer as projectPermissionsReducer,
} from "~/modules/project-permissions/project-permissions.js";
import {
	projectApi,
	reducer as projectsReducer,
} from "~/modules/projects/projects.js";
import { reducer as scriptsReducer } from "~/modules/scripts/scripts.js";
import { userApi, reducer as usersReducer } from "~/modules/users/users.js";

import {
	handleErrorMiddleware,
	handleUnauthorizedErrorMiddleware,
} from "./libs/middlewares/middlewares.js";
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
				}).prepend(
					handleUnauthorizedErrorMiddleware(),
					handleErrorMiddleware(this.extraArguments),
				);
			},
			reducer: {
				activityLogs: activityLogReducer,
				auth: authReducer,
				contributors: contributorsReducer,
				groups: groupsReducer,
				notifications: notificationsReducer,
				permissions: permissionReducer,
				projectApiKeys: projectApiKeysReducer,
				projectGroups: projectGroupsReducer,
				projectPermissions: projectPermissionsReducer,
				projects: projectsReducer,
				scripts: scriptsReducer,
				users: usersReducer,
			},
		});
	}

	public get extraArguments(): ExtraArguments {
		return {
			activityLogApi,
			authApi,
			contributorApi,
			groupApi,
			notificationApi,
			permissionApi,
			projectApi,
			projectApiKeysApi,
			projectGroupApi,
			projectPermissionsApi,
			storage,
			toastNotifier,
			userApi,
		};
	}
}

export { Store };
