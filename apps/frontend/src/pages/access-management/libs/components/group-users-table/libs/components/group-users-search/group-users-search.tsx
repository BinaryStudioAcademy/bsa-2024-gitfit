import { Search } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (search: string) => void;
};

const GroupUsersSearch = ({ onChange }: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search
				isLabelHidden
				label="Users search"
				onChange={onChange}
				placeholder="Enter name"
			/>
		</div>
	);
};

export { GroupUsersSearch };
