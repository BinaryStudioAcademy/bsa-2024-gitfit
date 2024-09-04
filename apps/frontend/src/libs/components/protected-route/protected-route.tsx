import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserGetPermissionItemResponseDto } from "~/modules/auth/auth.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	requiredPermissions?: string[];
};

const ProtectedRoute = ({
	children,
	requiredPermissions,
}: Properties): JSX.Element => {
	const { authenticatedUser, dataStatus, permissions } = useAppSelector(
		({ auth }) => auth,
	);

	const hasAuthenticatedUser = Boolean(authenticatedUser);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const hasRequiredPermission = requiredPermissions
		? requiredPermissions.every((permission) =>
				permissions.some(
					(userPermission: UserGetPermissionItemResponseDto) =>
						userPermission.key === permission,
				),
			)
		: true;

	if (isLoading) {
		return (
			<div className={styles["loader-container"]}>
				<Loader />
			</div>
		);
	}

	if (!hasAuthenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	if (!hasRequiredPermission) {
		return <Navigate replace to={AppRoute.ANY} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
