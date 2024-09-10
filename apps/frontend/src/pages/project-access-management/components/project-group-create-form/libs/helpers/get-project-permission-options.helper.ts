import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

const getProjectPermissionOptions = (
	permissions: ProjectPermissionsGetAllItemResponseDto[],
): SelectOption<number>[] =>
	permissions.map((permission) => ({
		label: permission.name,
		value: permission.id,
	}));

export { getProjectPermissionOptions };
