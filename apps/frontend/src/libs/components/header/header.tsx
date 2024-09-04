import logoSrc from "~/assets/images/logo.svg";
import { Avatar, NavLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { UserPopover } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const authenticatedUser = useAppSelector(
		({ auth }) => auth.authenticatedUser,
	);

	if (!authenticatedUser) {
		return <></>;
	}

	const { email, name } = authenticatedUser;

	return (
		<header className={styles["header"]}>
			<NavLink className={styles["logo-link"] as string} to={AppRoute.ROOT}>
				<div className={styles["logo-container"]}>
					<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
					<span className={styles["logo-text"]}>Logo</span>
				</div>
			</NavLink>
			<UserPopover email={email} name={name}>
				<Avatar name={name} />
			</UserPopover>
		</header>
	);
};

export { Header };
