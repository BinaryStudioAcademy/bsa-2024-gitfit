import { PageLayout } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Analytics = (): JSX.Element => {
	return (
		<PageLayout>
			<h1 className={styles["title"]}>Analytics</h1>
		</PageLayout>
	);
};

export { Analytics };
