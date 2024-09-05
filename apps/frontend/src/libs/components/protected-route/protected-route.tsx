import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
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

	const hasAuthenticatedUser = Boolean(authenticatedUser);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	const hasRequiredPermission = authenticatedUser
		? checkHasPermission(
				pagePermissions ?? [],
				authenticatedUser.groups.flatMap((group) => group.permissions),
			)
		: false;

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
		return <NotFound />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
