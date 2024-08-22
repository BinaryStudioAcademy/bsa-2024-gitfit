import {
	type ActionMeta,
	type MultiValue,
	type PropsValue,
	type SingleValue,
} from "react-select";
import ReactSelect from "react-select";

import { type Option } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties<T = string> = {
	isMulti?: boolean;
	onChange: (
		newValue: MultiValue<Option<T>> | SingleValue<Option<T>>,
		actionMeta: ActionMeta<Option<T>>,
	) => void;
	options: Option<T>[];
	placeholder?: string;
	title?: string;
	value: PropsValue<Option<T>>;
};

const Select = <T = string,>({
	isMulti = false,
	onChange,
	options,
	placeholder,
	title,
	value,
}: Properties<T>): JSX.Element => {
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
					clearIndicator: () => getClassName("clear-indicator"),
					control: (state) =>
						getClassName("control", "control--focused", state.isFocused),
					indicatorsContainer: () => getClassName("indicators-container"),
					indicatorSeparator: () => getClassName("indicator-separator"),
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
				onChange={onChange}
				options={options}
				placeholder={placeholder}
				unstyled
				value={value}
			/>
		</div>
	);
};

export { Select };
