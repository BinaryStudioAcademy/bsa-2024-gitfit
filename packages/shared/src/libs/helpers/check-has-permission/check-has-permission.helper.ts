import { type PermissionGetAllItemResponseDto } from "../../../modules/permissions/permissions.js";
import { type Permissions } from "../../types/types.js";

const checkHasPermission = (
	expectedPermissions: Permissions,
	actualPermissions: PermissionGetAllItemResponseDto[],
): boolean => {
	const actuals = new Set(actualPermissions.map((actual) => actual.key));
	const { alternative, required } = expectedPermissions;

	const hasRequiredPermissions = required
		? required.every((requiredPermission) => actuals.has(requiredPermission))
		: true;

	const hasAlternativePermission = alternative
		? alternative.some((alternativePermission) =>
				actuals.has(alternativePermission),
			)
		: true;

	return hasRequiredPermissions && hasAlternativePermission;
};

export { checkHasPermission };
