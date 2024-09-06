import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import {
	AppRoute,
	DataStatus,
	type PermissionKey,
} from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

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
		authenticatedUser.groups.flatMap((group) => group.permissions),
	);

	if (!hasRequiredPermission) {
		return <NotFound />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
