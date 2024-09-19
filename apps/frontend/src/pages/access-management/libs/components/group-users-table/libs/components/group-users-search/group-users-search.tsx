import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Search } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	name: FieldPath<T>;
	onChange: (search: string) => void;
};

const GroupUsersSearch = <T extends FieldValues>({
	control,
	errors,
	name,
	onChange,
}: Properties<T>): JSX.Element => {
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

export { GroupUsersSearch };
