import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as groupsReducer } from "~/modules/groups/groups.js";
import { type reducer as permissionsReducer } from "~/modules/permissions/permissions.js";
import { type reducer as projectsReducer } from "~/modules/projects/projects.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	groups: ReturnType<typeof groupsReducer>;
	permissions: ReturnType<typeof permissionsReducer>;
	projects: ReturnType<typeof projectsReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
