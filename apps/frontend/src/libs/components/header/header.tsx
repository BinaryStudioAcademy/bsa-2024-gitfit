import logoSrc from "~/assets/images/logo.svg";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { Avatar } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users); //TODO: Change this to getAuthenticatedUser when is ready
	const ZERO = 0;
	const ARRAY_FIRST_INDEX = users.at(ZERO)?.email.at(ZERO); // TODO: Modify this variable when getAuthenticatedUser when is ready
	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	return (
		<header className={styles["header"]}>
			<div className={styles["logo-container"]}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
				<span className={styles["logo-text"]}>Logo</span>
			</div>
			<div>
				<Avatar name={ARRAY_FIRST_INDEX} />
			</div>
		</header>
	);
};

export { Header };
