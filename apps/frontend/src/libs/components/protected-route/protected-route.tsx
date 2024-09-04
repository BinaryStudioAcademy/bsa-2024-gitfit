import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import {
	AppRoute,
	DataStatus,
	NotificationMessage,
} from "~/libs/enums/enums.js";
import { useAppSelector, useRef } from "~/libs/hooks/hooks.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	requiredPermissions?: string[];
};

const ProtectedRoute = ({
	children,
	requiredPermissions,
}: Properties): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);
	const { permissions } = useAppSelector(({ permissions }) => permissions);

	const hasShownError = useRef(false);

	const hasAuthenticatedUser = Boolean(authenticatedUser);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const hasRequiredPermission = requiredPermissions
		? requiredPermissions.every((permission) =>
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
		if (!hasShownError.current) {
			toastNotifier.showError(NotificationMessage.PERMISSIONS_REQUIRED);
			hasShownError.current = true;
		}

		return <Navigate replace to={AppRoute.ROOT} />;
	}

	if (!hasAuthenticatedUser) {
		return <Navigate replace to={AppRoute.SIGN_IN} />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
