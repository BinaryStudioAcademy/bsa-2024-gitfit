import { Loader, RouterOutlet } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);

	const isLoading = dataStatus === "pending";

	useEffect(() => {
		void dispatch(authActions.getAuthenticatedUser());
	}, [dispatch]);

	return <>{isLoading ? <Loader /> : <RouterOutlet />}</>;
};

export { App };
