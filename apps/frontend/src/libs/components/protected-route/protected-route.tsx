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
		const FIRST_ITEM_INDEX = 0;

		const firstAvailableRoute =
			getPermittedNavigationItems(SIDEBAR_ITEMS, userPermissions)[
				FIRST_ITEM_INDEX
			]?.href || AppRoute.ROOT;

		return <Navigate replace to={firstAvailableRoute} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
