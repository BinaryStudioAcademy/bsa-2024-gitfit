import { Header, Sidebar } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const PageLayout = ({ children }: Properties): JSX.Element => {
	return (
		<div className={styles["container"]}>
			<Header />
			<div className={styles["container-sidebar-content"]}>
				<Sidebar items={SIDEBAR_ITEMS} />
				<main className={styles["content-container"]}>{children}</main>
			</div>
		</div>
	);
};

export { PageLayout };
