import { PageLayout } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const NoAccess = (): JSX.Element => {
	return (
		<PageLayout>
			<div className={styles["container"]}>
				<h1 className={styles["title"]}>
					You do not have permission to access this page.
				</h1>
				<p className={styles["text"]}>
					Please contact an administrator to request access.
				</p>
			</div>
		</PageLayout>
	);
};

export { NoAccess };
