import { getAvatarInitials } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	const name = "Daniel"; // This is developer data to test getAvatarInitials function

	return (
		<header className={styles["header"]}>
			<div className={styles["logo_container"]}>
				<img
					alt=""
					className={styles["logo_img"]}
					src="/assets/images/timer.svg"
				/>
				<span className={styles["logo_text"]}>Logo</span>
			</div>

			<div>
				<div className={styles["avatar"]}>
					<span className={styles["avatar_letter"]}>
						{getAvatarInitials(name)}
					</span>
				</div>
			</div>
		</header>
	);
};

export { Header };
