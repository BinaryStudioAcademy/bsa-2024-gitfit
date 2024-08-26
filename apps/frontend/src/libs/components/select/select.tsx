import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect from "react-select";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue> = {
	control: Control<TFieldValues, null>;
	isMulti?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	options: SelectOption<TOptionValue>[];
};

const Select = <TFieldValues extends FieldValues, TOptionValue>({
	control,
	isMulti = false,
	label,
	name,
	options,
}: Properties<TFieldValues, TOptionValue>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	return (
		<label className={styles["label"]}>
			<span className={styles["label-text"]}>{label}</span>
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
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				unstyled
				value={field.value}
			/>
		</label>
	);
};

export { Select };
