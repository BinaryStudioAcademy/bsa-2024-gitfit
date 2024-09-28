import {
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkPermissions } from "~/libs/helpers/helpers.js";
import {
	type APIHandlerOptions,
	type APIPreHandler,
} from "~/libs/modules/controller/controller.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ValueOf } from "../types/types.js";

const checkUserPermissions = (
	permissions: ValueOf<typeof PermissionKey>[],
	projectsPermissions?: ValueOf<typeof ProjectPermissionKey>[],
	getProjectId?: (options: APIHandlerOptions) => number | undefined,
): APIPreHandler => {
	return (options, done): void => {
		const user = options.user as UserAuthResponseDto;
		const projectId = getProjectId?.(options);

		checkPermissions({
			projectId: projectId ?? null,
			projectsPermissions: projectsPermissions ?? null,
			rootPermissions: permissions,
			user,
		});

		done();
	};
};

export { checkUserPermissions };
