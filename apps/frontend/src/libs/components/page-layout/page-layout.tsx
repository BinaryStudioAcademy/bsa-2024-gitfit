import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";

import { Header } from "../header/header.js";
import { Sidebar } from "../sidebar/sidebar.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const PageLayout = ({ children }: Properties): JSX.Element => {
	return (
		<div className={styles["page"]}>
			<div className={styles["page-header"]}>
				<Header />
			</div>
			<div className={styles["page-body"]}>
				<aside className={styles["page-sidebar"]}>
					<Sidebar items={SIDEBAR_ITEMS} />
				</aside>
				<main className={styles["page-content"]}>{children}</main>
			</div>
		</div>
	);
};

export { PageLayout };
