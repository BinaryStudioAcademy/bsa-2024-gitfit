import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

const getPermissionOptions = (
	projectPermissions: ProjectPermissionsGetAllItemResponseDto[],
): SelectOption<number>[] =>
	projectPermissions.map((projectPermission) => ({
		label: projectPermission.name,
		value: projectPermission.id,
	}));

export { getPermissionOptions };
