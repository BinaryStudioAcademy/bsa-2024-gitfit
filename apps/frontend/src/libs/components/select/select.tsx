import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import ReactSelect, { type MultiValue, type SingleValue } from "react-select";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController, useMemo } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import { FIRST_OPTION_INDEX } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties<TFieldValues extends FieldValues, TOptionValue> = {
	background?: "primary" | "secondary";
	control: Control<TFieldValues, null>;
	isClearable?: boolean;
	isLabelHidden?: boolean;
	isMulti?: boolean;
	isSearchable?: boolean;
	label: string;
	name: FieldPath<TFieldValues>;
	options: SelectOption<TOptionValue>[];
	placeholder?: string;
	size?: "default" | "small";
};

const Select = <TFieldValues extends FieldValues, TOptionValue>({
	background = "secondary",
	control,
	isClearable = false,
	isLabelHidden = false,
	isMulti = false,
	isSearchable = false,
	label,
	name,
	options,
	placeholder,
	size = "default",
}: Properties<TFieldValues, TOptionValue>): JSX.Element => {
	const { field } = useFormController({
		control,
		name,
	});

	const isBackgroundPrimary = background === "primary";
	const isSmall = size === "small";
	const labelClassName = getValidClassNames(
		styles["label-text"],
		isLabelHidden && "visually-hidden",
	);

	const value = useMemo(() => {
		const fieldValue = Array.isArray(field.value) ? field.value : [field.value];

		const matchedOptions = fieldValue
			.map((value) => options.find((option) => option.value === value))
			.filter(Boolean);

		return isMulti
			? matchedOptions
			: (matchedOptions[FIRST_OPTION_INDEX] ?? null);
	}, [field.value, options, isMulti]);

	const handleChange = useCallback(
		(
			selectedOptions:
				| MultiValue<SelectOption<TOptionValue> | undefined>
				| SingleValue<SelectOption<TOptionValue> | undefined>,
		) => {
			if (isMulti) {
				const multiValues = (
					selectedOptions as MultiValue<SelectOption<TOptionValue>>
				).map(({ value }) => value);
				field.onChange(multiValues);
			} else {
				const singleValue = (
					selectedOptions as SingleValue<SelectOption<TOptionValue>>
				)?.value;
				field.onChange(singleValue ?? null);
			}
		},
		[isMulti, field],
	);

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
							isBackgroundPrimary && styles["control-primary"],
						),
					indicatorsContainer: () => styles["indicators-container"] as string,
					input: () => styles["input"] as string,
					menu: () =>
						getValidClassNames(
							styles["menu"],
							isBackgroundPrimary && styles["menu-primary"],
						),
					multiValue: () => styles["multi-value"] as string,
					multiValueLabel: () => styles["multi-value-label"] as string,
					noOptionsMessage: () => styles["no-options-message"] as string,
					option: (state) =>
						getValidClassNames(
							styles["option"],
							state.isSelected && styles["option-selected"],
							state.isFocused && styles["option-focused"],
							isSmall && styles["option-small"],
							isBackgroundPrimary && styles["option-primary"],
						),
					placeholder: () => styles["placeholder"] as string,
					singleValue: () =>
						getValidClassNames(
							styles["single-value"],
							isSmall && styles["single-value-small"],
						),
					valueContainer: () => styles["value-container"] as string,
				}}
				isClearable={isClearable}
				isMulti={isMulti}
				isSearchable={isSearchable}
				name={name}
				onChange={handleChange}
				options={options as PathValue<TFieldValues, Path<TFieldValues>>}
				placeholder={placeholder}
				styles={{
					control: (base) => ({
						...base,
						cursor: "pointer",
						minHeight: "32px",
					}),
					menu: (base) => ({
						...base,
						zIndex: 3,
					}),
					option: (base) => ({
						...base,
						cursor: "pointer",
					}),
				}}
				unstyled
				value={value}
			/>
		</label>
	);
};

export { Select };
