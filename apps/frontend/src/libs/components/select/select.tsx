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
					indicatorsContainer: () => styles["indicators-container"] as string,
					input: () => styles["input"] as string,
					menu: () => styles["menu"] as string,
					multiValue: () => styles["multi-value"] as string,
					multiValueLabel: () => styles["multi-value-label"] as string,
					noOptionsMessage: () => styles["no-options-message"] as string,
					option: (state) =>
						getValidClassNames(
							styles["option"],
							state.isSelected && styles["option-selected"],
							state.isFocused && styles["option-focused"],
						),
					placeholder: () => styles["placeholder"] as string,
					singleValue: () => styles["single-value"] as string,
					valueContainer: () => styles["value-container"] as string,
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
