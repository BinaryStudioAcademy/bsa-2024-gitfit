import { Icon } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const IsHiddenHeader = (): JSX.Element => (
	<div className={styles["header-with-icon"]}>
		Is Hidden <Icon height={15} name="circleQuestion" width={15} />
	</div>
);

export { IsHiddenHeader };
