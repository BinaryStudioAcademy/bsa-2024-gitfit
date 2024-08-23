import { type ReactNode } from "react";

type Properties = {
	children: ReactNode;
};

const ProtectedRoute = ({ children }: Properties): JSX.Element => {
	// For testing purposes, directly return the children
	return <>{children}</>;
};

export { ProtectedRoute };
