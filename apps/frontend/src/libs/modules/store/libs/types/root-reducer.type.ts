import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as contributorsReducer } from "~/modules/contributors/contributors.js";
import { type reducer as groupsReducer } from "~/modules/groups/groups.js";
import { type reducer as notificationsReducer } from "~/modules/notifications/notifications.js";
import { type reducer as permissionsReducer } from "~/modules/permissions/permissions.js";
import { type reducer as projectApiKeysReducer } from "~/modules/project-api-keys/project-api-keys.js";
import { type reducer as projectGroupsReducer } from "~/modules/project-groups/project-groups.js";
import { type reducer as projectPermissionsReduser } from "~/modules/project-permissions/project-permissions.js";
import { type reducer as projectsReducer } from "~/modules/projects/projects.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	contributors: ReturnType<typeof contributorsReducer>;
	groups: ReturnType<typeof groupsReducer>;
	notifications: ReturnType<typeof notificationsReducer>;
	permissions: ReturnType<typeof permissionsReducer>;
	projectApiKeys: ReturnType<typeof projectApiKeysReducer>;
	projectGroups: ReturnType<typeof projectGroupsReducer>;
	projectPermissions: ReturnType<typeof projectPermissionsReduser>;
	projects: ReturnType<typeof projectsReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
