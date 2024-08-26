import { type ReactNode } from "react";

import { Header, Sidebar } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/navigation-items.constant.js";

import styles from "./styles.module.css";

type CommonLayoutProperties = {
	children: ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProperties): JSX.Element => {
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

export { CommonLayout };
