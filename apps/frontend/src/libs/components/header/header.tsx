import logoSrc from "~/assets/images/logo.svg";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Avatar, Popup, UserPopup } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	let authenticatedUser = useAppSelector(({ auth }) => auth.authenticatedUser);

	if (!authenticatedUser) {
		return <></>;
	}

	const { email, name } = authenticatedUser.user;

	return (
		<header className={styles["header"]}>
			<div className={styles["logo-container"]}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
				<span className={styles["logo-text"]}>Logo</span>
			</div>
			<Popup content={<UserPopup email={email} name={name} />}>
				<Avatar name={name} />
			</Popup>
		</header>
	);
};

export { Header };
