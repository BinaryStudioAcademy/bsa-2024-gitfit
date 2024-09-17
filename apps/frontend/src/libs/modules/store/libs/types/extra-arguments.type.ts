import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type activityLogApi } from "~/modules/activity-logs/activity-logs.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type groupApi } from "~/modules/groups/groups.js";
import { type permissionApi } from "~/modules/permissions/permissions.js";
import { type projectApiKeysApi } from "~/modules/project-api-keys/project-api-keys.js";
import { type projectApi } from "~/modules/projects/projects.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	activityLogApi: typeof activityLogApi;
	authApi: typeof authApi;
	groupApi: typeof groupApi;
	permissionApi: typeof permissionApi;
	projectApi: typeof projectApi;
	projectApiKeysApi: typeof projectApiKeysApi;
	storage: Storage;
	toastNotifier: ToastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
