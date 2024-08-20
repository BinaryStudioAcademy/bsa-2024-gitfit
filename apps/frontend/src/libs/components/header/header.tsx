import { Avatar } from "../components.js";
import styles from "./styles.module.css";

const Header = (): JSX.Element => {
	return (
		<header className={styles["header"]}>
			<div className={styles["logo-container"]}>
				<img
					alt=""
					className={styles["logo-img"]}
					src="/assets/images/logo.svg"
				/>
				<span className={styles["logo-text"]}>Logo</span>
			</div>
			<div>
				<Avatar />
			</div>
		</header>
	);
};

export { Header };
