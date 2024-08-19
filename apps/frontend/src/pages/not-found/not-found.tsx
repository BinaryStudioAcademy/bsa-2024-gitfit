import { Link } from "react-router-dom";

import styles from "./styles.module.css";

const NotFound = (): JSX.Element => {
	return (
		<main className={styles["container"]}>
			<h1 className={styles["title"]}>404</h1>
			<h3 className={styles["subtitle"]}>Something went wrong</h3>
			<p className={styles["text"]}>
				Sorry, we can’t find the page you’re looking for.
			</p>
			<Link className={styles["link"]} to="/">
				Back to home
			</Link>
		</main>
	);
};

export { NotFound };
