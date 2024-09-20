import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";

const getPermissionOptions = (
	permissions: PermissionGetAllItemResponseDto[],
): SelectOption<number>[] =>
	permissions.map((permission) => ({
		label: permission.name,
		value: permission.id,
	}));

export { getPermissionOptions };
