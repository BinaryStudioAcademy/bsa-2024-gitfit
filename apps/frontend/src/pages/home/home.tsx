import { PageLayout } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Home = (): JSX.Element => {
	return (
		<PageLayout>
			<header className={styles["home-header"]}>
				<h1 className={styles["title"]}>GitFit Home</h1>
			</header>
		</PageLayout>
	);
};

export { Home };
