import {
	ExceptionMessage,
	type PermissionKey,
	type ProjectPermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { type ValueOf } from "../types/types.js";

const checkGlobalOrProjectPermissions = (
	rootPermissions: ValueOf<typeof PermissionKey>[],
	projectPermissions: ValueOf<typeof ProjectPermissionKey>[],
): APIPreHandler => {
	return (options, done): void => {
		const user = options.user as UserAuthResponseDto;

		const userPermissions = user.groups.flatMap((group) => group.permissions);

		const hasRootPermission = checkHasPermission(
			rootPermissions,
			userPermissions,
		);

		if (hasRootPermission) {
			done();

			return;
		}

		const userProjectPermissions = user.projectGroups.flatMap(
			(group) => group.permissions,
		);
		const hasProjectPermission = checkHasPermission(
			projectPermissions,
			userProjectPermissions,
		);

		if (!hasProjectPermission) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		done();
	};
};

export { checkGlobalOrProjectPermissions };
