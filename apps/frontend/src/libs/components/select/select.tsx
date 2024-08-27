import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, { type ActionMeta, type OnChangeValue } from "react-select";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue> = {
	control: Control<TFieldValues, null>;
	isLabelHidden?: boolean;
	isMulti?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	onChange?: (option: SelectOption<TOptionValue>) => void;
	options: SelectOption<TOptionValue>[];
	placeholder?: string;
	size?: "default" | "small";
};

const Select = <TFieldValues extends FieldValues, TOptionValue>({
	control,
	isLabelHidden = false,
	isMulti = false,
	label,
	name,
	onChange = (): void => {},
	options,
	placeholder,
	size = "default",
}: Properties<TFieldValues, TOptionValue>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	type Option = SelectOption<TOptionValue>;

	const handleOnChange = useCallback(
		(
			option: OnChangeValue<Option, typeof isMulti>,
			actionMeta: ActionMeta<Option>,
		): void => {
			if (actionMeta.action === "select-option") {
				const selectedOption = (isMulti ? actionMeta.option : option) as Option;
				onChange(selectedOption);
			} else if (actionMeta.action === "remove-value") {
				onChange(actionMeta.removedValue);
			}

			field.onChange(option, actionMeta);
		},
		[onChange, isMulti, field],
	);

	const labelClassName = isLabelHidden
		? "visually-hidden"
		: styles["label-text"];
	const isSmall = size === "small";

	return (
		<label className={styles["label"]}>
			<span className={labelClassName}>{label}</span>
			<ReactSelect
				classNames={{
					control: (state) =>
						getValidClassNames(
							styles["control"],
							state.isFocused && styles["control-focused"],
							isSmall && styles["control-small"],
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
							isSmall && styles["option-small"],
						),
					placeholder: () => styles["placeholder"] as string,
					singleValue: () =>
						getValidClassNames(
							styles["single-value"],
							isSmall && styles["single-value-small"],
						),
					valueContainer: () => styles["value-container"] as string,
				}}
				isClearable={false}
				isMulti={isMulti}
				name={name}
				onChange={handleOnChange}
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				placeholder={placeholder}
				styles={{
					control: (base) => ({
						...base,
						minHeight: "32px",
					}),
				}}
				unstyled
				value={field.value}
			/>
		</label>
	);
};

export { Select };
