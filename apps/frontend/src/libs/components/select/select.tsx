import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import ReactSelect, {
	type GroupBase,
	type OptionsOrGroups,
} from "react-select";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	isMulti?: boolean;
	name: FieldPath<T>;
	options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
	placeholder?: string;
	title?: string;
};

const Select = <T extends FieldValues>({
	control,
	isMulti = false,
	name,
	options,
	placeholder,
	title,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	return (
		<div className={styles["container"]}>
			{title && <span className={styles["title"]}>{title}</span>}
			<ReactSelect
				classNames={{
					control: (state) =>
						getValidClassNames(
							styles["control"],
							state.isFocused && styles["control--focused"],
						),
					indicatorsContainer: () =>
						getValidClassNames(styles["indicators-container"]),
					input: () => getValidClassNames(styles["input"]),
					menu: () => getValidClassNames(styles["menu"]),
					multiValue: () => getValidClassNames(styles["multi-value"]),
					multiValueLabel: () =>
						getValidClassNames(styles["multi-value-label"]),
					noOptionsMessage: () =>
						getValidClassNames(styles["no-options-message"]),
					option: (state) =>
						getValidClassNames(
							styles["option"],
							state.isSelected && styles["option--selected"],
							state.isFocused && styles["option--focused"],
						),
					placeholder: () => getValidClassNames(styles["placeholder"]),
					singleValue: () => getValidClassNames(styles["single-value"]),
					valueContainer: () => getValidClassNames(styles["value-container"]),
				}}
				isClearable={false}
				isMulti={isMulti}
				name={name}
				onChange={field.onChange}
				options={options}
				placeholder={placeholder}
				unstyled
				value={field.value}
			/>
		</div>
	);
};

export { Select };
export { type Option } from "./libs/types/types.js";
