import logoSrc from "~/assets/images/logo.svg";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Avatar } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	if (!authenticatedUser) {
		return <></>;
	}

	const userName = authenticatedUser.name;

	return (
		<header className={styles["header"]}>
			<div className={styles["logo-container"]}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
				<span className={styles["logo-text"]}>Logo</span>
			</div>
			<Avatar name={userName} />
		</header>
	);
};

export { Header };
