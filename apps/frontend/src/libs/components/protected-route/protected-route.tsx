import { Loader, Navigate } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import {
	AppRoute,
	DataStatus,
	type PermissionKey,
} from "~/libs/enums/enums.js";
import {
	checkHasPermission,
	getPermittedNavigationItems,
} from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	routePermissions?: ValueOf<typeof PermissionKey>[];
};

const ProtectedRoute = ({
	children,
	routePermissions = [],
}: Properties): JSX.Element => {
	const {
		authenticatedUser,
		dataStatus,
		projectUserPermissions,
		userPermissions,
	} = useAppSelector(({ auth }) => auth);

	const allPermissions = [...projectUserPermissions, ...userPermissions];

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (isLoading) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	if (!authenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	const hasRequiredPermission = checkHasPermission(
		routePermissions,
		allPermissions,
	);

	if (!hasRequiredPermission) {
		const [navigationItem] = getPermittedNavigationItems(
			SIDEBAR_ITEMS,
			allPermissions,
		);

		const redirectLink = navigationItem?.href ?? AppRoute.NO_ACCESS;

		return <Navigate replace to={redirectLink} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
