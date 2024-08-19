import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

type ProtectedRouteProperties = {
	children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProperties> = ({
	children,
}: ProtectedRouteProperties): JSX.Element => {
	const authStatus = useAppSelector((state) => state.auth.dataStatus);

	return authStatus === DataStatus.FULFILLED ? (
		<>{children}</>
	) : (
		<Navigate replace to={AppRoute.SIGN_IN} />
	);
};

export { ProtectedRoute };
