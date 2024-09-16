import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ToastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type authApi } from "~/modules/auth/auth.js";
import { type contributorApi } from "~/modules/contributors/contributors.js";
import { type groupApi } from "~/modules/groups/groups.js";
import { type permissionApi } from "~/modules/permissions/permissions.js";
import { type projectApi } from "~/modules/projects/projects.js";
import { type userApi } from "~/modules/users/users.js";

type ExtraArguments = {
	authApi: typeof authApi;
	contributorApi: typeof contributorApi;
	groupApi: typeof groupApi;
	permissionApi: typeof permissionApi;
	projectApi: typeof projectApi;
	storage: Storage;
	toastNotifier: ToastNotifier;
	userApi: typeof userApi;
};

export { type ExtraArguments };
