import { Loader, Navigate } from "~/libs/components/components.js";
import { EMPTY_LENGTH, SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import {
	AppRoute,
	DataStatus,
	type PermissionKey,
	type ProjectPermissionKey,
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
	routeExtraPermissions?: ValueOf<typeof PermissionKey>[];
	routePermissions?: ValueOf<typeof PermissionKey>[];
	routeProjectPermissions?: ValueOf<typeof ProjectPermissionKey>[];
};

const ProtectedRoute = ({
	children,
	routeExtraPermissions = [],
	routePermissions = [],
	routeProjectPermissions = [],
}: Properties): JSX.Element => {
	const {
		authenticatedUser,
		dataStatus,
		projectUserPermissions,
		userPermissions,
	} = useAppSelector(({ auth }) => auth);

	const allPermissions = [
		...Object.values(projectUserPermissions).flat(),
		...userPermissions,
	];

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

	const hasBasePermission = checkHasPermission(
		routePermissions,
		userPermissions,
	);

	const hasExtraPermission = checkHasPermission(
		routeExtraPermissions,
		userPermissions,
	);

	const hasProjectPermissions =
		routeProjectPermissions.length !== EMPTY_LENGTH &&
		checkHasPermission(
			routeProjectPermissions,
			Object.values(projectUserPermissions).flat(),
		);

	const hasRequiredPermissions =
		(hasBasePermission && hasExtraPermission) || hasProjectPermissions;

	if (!hasRequiredPermissions) {
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
