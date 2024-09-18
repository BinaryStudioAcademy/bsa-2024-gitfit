import { DataStatus, type PermissionKey } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	children: React.ReactNode;
	requiredPermissions: ValueOf<typeof PermissionKey>[];
};

const ProtectedComponent = ({
	children,
	requiredPermissions,
}: Properties): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (isLoading || !authenticatedUser) {
		return <></>;
	}

	const userPermissions = authenticatedUser.groups.flatMap(
		(group) => group.permissions,
	);

	const hasRequiredPermission = checkHasPermission(
		requiredPermissions,
		userPermissions,
	);

	return <>{hasRequiredPermission && children}</>;
};

export { ProtectedComponent };
