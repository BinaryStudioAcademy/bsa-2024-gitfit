import { PageLayout } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const NoAccess = (): JSX.Element => {
	return (
		<PageLayout>
			<div className={styles["container"]}>
				<h1 className={styles["title"]}>Pending access</h1>
				<p className={styles["text"]}>
					You do not have access to any pages for now. Please contact an admin
					to enable access for you.
				</p>
			</div>
		</PageLayout>
	);
};

export { NoAccess };
