import { IconButton, Popover } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const TableOptions = ({ children }: Properties): React.ReactElement => {
	return (
		<div className={styles["options-cell"]}>
			<Popover
				content={<div className={styles["options-content"]}>{children}</div>}
			>
				<IconButton iconName="options" label="options" />
			</Popover>
		</div>
	);
};

export { TableOptions };
