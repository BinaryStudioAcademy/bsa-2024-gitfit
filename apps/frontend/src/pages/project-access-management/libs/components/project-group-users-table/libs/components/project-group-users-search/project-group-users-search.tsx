import {
	type Control,
	type FieldErrors,
	type FieldPath,
} from "react-hook-form";

import { Search } from "~/libs/components/components.js";
import { type SearchForm } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	control: Control<SearchForm>;
	errors: FieldErrors<SearchForm>;
	name: FieldPath<SearchForm>;
	onChange: (search: string) => void;
};

const ProjectGroupUsersSearch = ({
	control,
	errors,
	name,
	onChange,
}: Properties): JSX.Element => {
	return (
		<div className={styles["search-container"]}>
			<Search
				control={control}
				errors={errors}
				isLabelHidden
				label="Users search"
				name={name}
				onChange={onChange}
				placeholder="Enter name"
			/>
		</div>
	);
};

export { ProjectGroupUsersSearch };
