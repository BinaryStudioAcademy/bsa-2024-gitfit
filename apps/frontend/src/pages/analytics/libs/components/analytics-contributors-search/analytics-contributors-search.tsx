import { Search } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (search: string) => void;
};

const AnalyticsContributorsSearch = ({ onChange }: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search
				isLabelHidden
				label="Contributors search"
				onChange={onChange}
				placeholder="Enter name"
			/>
		</div>
	);
};

export { AnalyticsContributorsSearch };
