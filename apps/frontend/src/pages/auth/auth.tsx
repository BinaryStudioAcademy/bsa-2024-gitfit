import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useLocation,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { Logo, SignInForm, SignUpForm } from "./components/components.js";
import styles from "./styles.module.css";

const Auth = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const authenticatedUser = useAppSelector(
		(state) => state.auth.authenticatedUser,
	);
	const navigate = useNavigate();
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);

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

	const handleImageError = useCallback(() => {
		setIsImageLoaded(false);
	}, []);

	return (
		<main className={styles["container"]}>
			<section className={styles["auth-container"]}>
				<div className={styles["left-side"]}>
					{/* TODO: add logoSrc */}
					<Logo
						isImageLoaded={isImageLoaded}
						logoSrc=""
						onImageError={handleImageError}
					/>
				</div>
				<div className={styles["right-side"]}>
					<h3 className={styles["form-title"]}>
						{pathname === AppRoute.SIGN_IN
							? "Welcome back"
							: "Create an account"}
					</h3>
					{handleScreenRender(pathname)}
				</div>
			</section>
		</main>
	);
};

export { Auth };
