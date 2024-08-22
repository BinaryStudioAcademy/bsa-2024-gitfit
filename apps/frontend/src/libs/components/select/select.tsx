import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import ReactSelect, {
	type GroupBase,
	type OptionsOrGroups,
} from "react-select";

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

	const getClassName = (
		baseClass: string,
		conditionClass?: string,
		condition = false,
	): string => {
		const base = styles[baseClass] || "";
		const conditional =
			condition && conditionClass ? styles[conditionClass] || "" : "";

		return `${base} ${conditional}`.trim();
	};

	return (
		<div className={styles["container"]}>
			{title && <span className={styles["title"]}>{title}</span>}
			<ReactSelect
				classNames={{
					control: (state) =>
						getClassName("control", "control--focused", state.isFocused),
					indicatorsContainer: () => getClassName("indicators-container"),
					input: () => getClassName("input"),
					menu: () => getClassName("menu"),
					multiValue: () => getClassName("multi-value"),
					multiValueLabel: () => getClassName("multi-value-label"),
					noOptionsMessage: () => getClassName("no-options-message"),
					option: (state) =>
						getClassName(
							"option",
							state.isSelected ? "option--selected" : "option--focused",
							state.isSelected || state.isFocused,
						),
					placeholder: () => getClassName("placeholder"),
					singleValue: () => getClassName("single-value"),
					valueContainer: () => getClassName("value-container"),
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
