import { Search } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (search: string) => void;
};

const ProjectsSearch = ({ onChange }: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search
				isLabelHidden
				label="Projects search"
				onChange={onChange}
				placeholder="Enter project name"
			/>
		</div>
	);
};

export { ProjectsSearch };
