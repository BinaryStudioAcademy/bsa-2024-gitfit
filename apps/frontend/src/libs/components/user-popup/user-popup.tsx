import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

type Properties = {
	email: string;
	name: string;
};

const UserPopup = ({ email, name }: Properties): JSX.Element => {
	return (
		<div className={styles["user-popup"]}>
			<div className={styles["user-info"]}>
				<p className={styles["user-name"]}>{name}</p>
				<p className={styles["user-email"]}>{email}</p>
			</div>
			<div className={styles["buttons"]}>
				<a className={styles["button"]} href={AppRoute.PROFILE}>
					Profile
				</a>
				<button className={styles["button"]}>Log out</button>
			</div>
		</div>
	);
};

export { UserPopup };
