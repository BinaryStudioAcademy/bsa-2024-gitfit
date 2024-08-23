import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type Properties = {
	children: ReactNode;
};

const ProtectedRoute = ({ children }: Properties): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);

	const hasAuthenticatedUser = Boolean(authenticatedUser);
	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (isLoading) {
		return <Loader />;
	}

	return hasAuthenticatedUser ? (
		<>{children}</>
	) : (
		<Navigate replace to={AppRoute.SIGN_IN} />
	);
};

export { ProtectedRoute };
