import { type PermissionKey } from "~/libs/enums/enums.js";
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
	const { userPermissions } = useAppSelector(({ auth }) => auth);

	const hasRequiredPermission = checkHasPermission(
		requiredPermissions,
		userPermissions,
	);

	return <>{hasRequiredPermission && children}</>;
};

export { ProtectedComponent };
