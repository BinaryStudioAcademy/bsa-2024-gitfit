import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type activityLogApi } from "~/modules/activity/activity.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type contributorApi } from "~/modules/contributors/contributors.js";
import { type groupApi } from "~/modules/groups/groups.js";
import { type notificationApi } from "~/modules/notifications/notifications.js";
import { type permissionApi } from "~/modules/permissions/permissions.js";
import { type projectApiKeysApi } from "~/modules/project-api-keys/project-api-keys.js";
import { type projectGroupApi } from "~/modules/project-groups/project-groups.js";
import { type projectPermissionsApi } from "~/modules/project-permissions/project-permissions.js";
import { type projectApi } from "~/modules/projects/projects.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	activityLogApi: typeof activityLogApi;
	authApi: typeof authApi;
	contributorApi: typeof contributorApi;
	groupApi: typeof groupApi;
	notificationApi: typeof notificationApi;
	permissionApi: typeof permissionApi;
	projectApi: typeof projectApi;
	projectApiKeysApi: typeof projectApiKeysApi;
	projectGroupApi: typeof projectGroupApi;
	projectPermissionsApi: typeof projectPermissionsApi;
	storage: Storage;
	toastNotifier: ToastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
