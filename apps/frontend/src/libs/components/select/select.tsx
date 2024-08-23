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

import { type Option } from "./select.js";
import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TValue> = {
	control: Control<TFieldValues, null>;
	isMulti?: boolean;
	name: FieldPath<TFieldValues>;
	options:
		| OptionsOrGroups<Option<TValue>, GroupBase<Option<TValue>>>
		| undefined;
	title?: string;
};

const Select = <TFieldValues extends FieldValues, TValue>({
	control,
	isMulti = false,
	name,
	options,
	title,
}: Properties<TFieldValues, TValue>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	return (
		<label className={styles["label"]}>
			<span className={styles["label-text"]}>{title}</span>
			<ReactSelect
				classNames={{
					control: (state) =>
						getValidClassNames(
							styles["control"],
							state.isFocused && styles["control-focused"],
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
							state.isSelected && styles["option-selected"],
							state.isFocused && styles["option-focused"],
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
				unstyled
				value={field.value}
			/>
		</label>
	);
};

export { Select };
export { type Option } from "./libs/types/types.js";
