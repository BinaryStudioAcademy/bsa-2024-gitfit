import { RouterOutlet } from "~/libs/components/components.js";
import { useAppDispatch, useEffect } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
		void dispatch(authActions.loadPermissions());
	}, [dispatch]);

	return <RouterOutlet />;
};

export { App };
