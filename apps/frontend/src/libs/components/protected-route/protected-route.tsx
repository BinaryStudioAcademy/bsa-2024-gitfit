import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type ProtectedRouteProperties = {
	children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProperties> = ({
	children,
}: ProtectedRouteProperties): JSX.Element => {
	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	);

	return authenticatedUser ? (
		<>{children}</>
	) : (
		<Navigate replace to={AppRoute.SIGN_IN} />
	);
};

export { ProtectedRoute };
