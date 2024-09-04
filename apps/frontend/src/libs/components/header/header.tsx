import logoSrc from "~/assets/images/logo.svg";
import { Avatar } from "~/libs/components/components.js";
import { useAppSelector, usePopover } from "~/libs/hooks/hooks.js";

import { UserPopover } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const { isOpened, onClose, onOpen } = usePopover();

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
			<UserPopover
				email={email}
				isOpened={isOpened}
				name={name}
				onClose={onClose}
			>
				<button
					className={styles["user-button"]}
					onClick={isOpened ? onClose : onOpen}
				>
					<Avatar name={name} />
				</button>
			</UserPopover>
		</header>
	);
};

export { Header };
