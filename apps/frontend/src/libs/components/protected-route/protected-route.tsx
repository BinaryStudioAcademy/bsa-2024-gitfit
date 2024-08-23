import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type Properties = {
	children: ReactNode;
};

const ProtectedRoute = ({ children }: Properties): JSX.Element => {
	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	);

	const hasAuthenticatedUser = Boolean(authenticatedUser);

	return hasAuthenticatedUser ? (
		<>{children}</>
	) : (
		<Navigate replace to={AppRoute.SIGN_IN} />
	);
};

export { ProtectedRoute };
