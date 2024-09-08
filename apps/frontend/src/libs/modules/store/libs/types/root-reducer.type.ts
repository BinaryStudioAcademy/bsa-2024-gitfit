import { type reducer as authReducer } from "~/modules/auth/auth.js";
import { type reducer as groupsReducer } from "~/modules/groups/groups.js";
import { type reducer as projectApiKeysReducer } from "~/modules/project-api-keys/project-api-keys.js";
import { type reducer as projectsReducer } from "~/modules/projects/projects.js";
import { type reducer as usersReducer } from "~/modules/users/users.js";

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	groups: ReturnType<typeof groupsReducer>;
	projectApiKeys: ReturnType<typeof projectApiKeysReducer>;
	projects: ReturnType<typeof projectsReducer>;
	users: ReturnType<typeof usersReducer>;
};

export { type RootReducer };
