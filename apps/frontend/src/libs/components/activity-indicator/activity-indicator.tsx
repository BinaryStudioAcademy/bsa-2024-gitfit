import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	label: string;
	status: "green" | "red" | "yellow";
};

const ActivityIndicator = ({ label, status }: Properties): JSX.Element => {
	return (
		<span
			className={getValidClassNames(
				styles["activity-indicator"],
				styles[`status-${status}`],
			)}
		>
			{label}
		</span>
	);
};

export { ActivityIndicator };
