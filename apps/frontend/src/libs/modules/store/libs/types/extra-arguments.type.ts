import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type groupApi } from "~/modules/groups/groups.js";
import { type notificationApi } from "~/modules/notifications/notifications.js";
import { type permissionApi } from "~/modules/permissions/permissions.js";
import { type projectApiKeysApi } from "~/modules/project-api-keys/project-api-keys.js";
import { type projectApi } from "~/modules/projects/projects.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	groupApi: typeof groupApi;
	notificationApi: typeof notificationApi;
	permissionApi: typeof permissionApi;
	projectApi: typeof projectApi;
	projectApiKeysApi: typeof projectApiKeysApi;
	storage: Storage;
	toastNotifier: ToastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
