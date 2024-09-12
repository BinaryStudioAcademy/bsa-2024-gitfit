import { Search } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (search: string) => void;
};

const GroupUsersSearch = ({ onChange }: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search isLabelHidden label="Enter name" onChange={onChange} />
		</div>
	);
};

export { GroupUsersSearch };
