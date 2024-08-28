import logoSrc from "~/assets/images/logo.svg";
import { Avatar, Popover } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { UserPopover } from "./libs/components/user-popover/user-popover.js";
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
			<div className={styles["logo-container"]}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
				<span className={styles["logo-text"]}>Logo</span>
			</div>
			<Popover content={<UserPopover email={email} name={name} />}>
				<Avatar name={name} />
			</Popover>
		</header>
	);
};

export { Header };
