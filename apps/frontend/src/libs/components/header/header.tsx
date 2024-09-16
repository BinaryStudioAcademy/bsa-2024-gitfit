import logoSrc from "~/assets/images/logo.svg";
import { Avatar, NavLink } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, usePopover, useRef } from "~/libs/hooks/hooks.js";

import { UserPopover } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const avatarReference = useRef<HTMLButtonElement>(null);
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
			<NavLink className={styles["logo-link"] as string} to={AppRoute.ROOT}>
				<img alt="GitFit logo" className={styles["logo-img"]} src={logoSrc} />
			</NavLink>
			<button
				className={styles["user-popover-trigger"]}
				onClick={isOpened ? onClose : onOpen}
				ref={avatarReference}
			>
				<Avatar name={name} />
			</button>
			<UserPopover
				email={email}
				isOpened={isOpened}
				name={name}
				onClose={onClose}
				targetReference={avatarReference}
			/>
		</header>
	);
};

export { Header };
