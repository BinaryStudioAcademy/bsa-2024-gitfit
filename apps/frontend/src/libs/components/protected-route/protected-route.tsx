import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/libs/types/types.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	pagePermissions?: string[];
};

const ProtectedRoute = ({
	children,
	pagePermissions,
}: Properties): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);
	const { permissions } = useAppSelector(({ permissions }) => permissions);

	const hasAuthenticatedUser = Boolean(authenticatedUser);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const hasRequiredPermission = pagePermissions
		? pagePermissions.every((permission) =>
				permissions.items.some(
					(userPermission: PermissionGetAllItemResponseDto) =>
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

	if (!hasRequiredPermission) {
		return <NotFound />;
	}

	if (!hasAuthenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
