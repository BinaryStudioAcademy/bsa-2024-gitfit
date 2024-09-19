import { type Control, type FieldErrors } from "react-hook-form";

import { Search } from "~/libs/components/components.js";
import { type SearchForm } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	control: Control<SearchForm>;
	errors: FieldErrors<SearchForm>;
	onChange: (search: string) => void;
};

const ProjectGroupUsersSearch = ({
	control,
	errors,
	onChange,
}: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search
				control={control}
				errors={errors}
				isLabelHidden
				label="Users search"
				onChange={onChange}
				placeholder="Enter name"
			/>
		</div>
	);
};

export { ProjectGroupUsersSearch };
