import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";
import styles from "./styles.module.css";

const Auth = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (authenticatedUser) {
			navigate(AppRoute.ROOT);
		}
	}, [authenticatedUser, navigate]);

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const handleScreenRender = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	return (
		<main className={styles["container"]}>{handleScreenRender(pathname)}</main>
	);
};

export { Auth };
