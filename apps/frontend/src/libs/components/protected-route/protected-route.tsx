import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
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
import { useAppSelector, useMemo } from "~/libs/hooks/hooks.js";
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
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);

	const userPermissions = useMemo(() => {
		return (
			authenticatedUser?.groups.flatMap((group) => group.permissions) ?? []
		);
	}, [authenticatedUser]);

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
		userPermissions,
	);

	if (!hasRequiredPermission) {
		const [navigationItem] = getPermittedNavigationItems(
			SIDEBAR_ITEMS,
			userPermissions,
		);
		const redirectLink = navigationItem?.href ?? AppRoute.NO_ACCESS;

		return <Navigate replace to={redirectLink} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
