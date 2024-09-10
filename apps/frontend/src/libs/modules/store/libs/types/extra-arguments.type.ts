import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type groupApi } from "~/modules/groups/groups.js";
import { type permissionApi } from "~/modules/permissions/permissions.js";
import { type projectGroupApi } from "~/modules/project-groups/project-groups.js";
import { type projectPermissionsApi } from "~/modules/project-permissions/project-permissions.js";
import { type projectApi } from "~/modules/projects/projects.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	groupApi: typeof groupApi;
	permissionApi: typeof permissionApi;
	projectApi: typeof projectApi;
	projectGroupApi: typeof projectGroupApi;
	projectPermissionsApi: typeof projectPermissionsApi;
	storage: Storage;
	toastNotifier: ToastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
