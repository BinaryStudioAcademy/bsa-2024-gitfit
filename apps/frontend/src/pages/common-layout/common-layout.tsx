import { type ReactNode } from "react";

import { Header } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type CommonLayoutProperties = {
	children: ReactNode;
};

const CommonLayout = ({ children }: CommonLayoutProperties): JSX.Element => {
	return (
		<div className={styles["container"]}>
			<Header />
			<div className={styles["container-sidebar-content"]}>
				<div
					style={{ backgroundColor: "white", height: "100vh", width: "280px" }}
				>
					{/* add sidebar*/}
				</div>
				<main className={styles["content-container"]}>{children}</main>
			</div>
		</div>
	);
};

export { CommonLayout };
