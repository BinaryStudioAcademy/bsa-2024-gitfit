import { useCallback, useMemo } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./style.module.css";

type Properties<
	T extends FieldValues,
	V extends FieldValues[FieldPath<T>][number],
> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isDisabled?: boolean;
	isErrorHidden?: boolean;
	isLabelHidden?: boolean;
	label: string;
	listKey?: V;
	name: FieldPath<T>;
};

const Checkbox = <
	T extends FieldValues,
	V extends FieldValues[FieldPath<T>][number],
>({
	control,
	errors,
	isDisabled,
	isErrorHidden,
	isLabelHidden,
	label,
	listKey,
	name,
}: Properties<T, V>): JSX.Element => {
	const {
		field: { onChange, value, ...field },
	} = useFormController({ control, name });

	const values = useMemo((): V[] => value ?? [], [value]);
	const isChecked = listKey ? values.includes(listKey) : value;
	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const handleChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>) => {
			const isChecked = event_.target.checked;

			if (listKey) {
				onChange(
					isChecked
						? [...values, listKey]
						: values.filter((item) => item !== listKey),
				);

				return;
			}

			onChange(isChecked);
		},
		[values, listKey, onChange],
	);

	return (
		<label className={styles["container"]}>
			<input
				checked={isChecked}
				className={styles["checkbox"]}
				disabled={isDisabled}
				onChange={handleChange}
				type="checkbox"
				{...field}
			/>
			<span className={styles["checkmark"]} />
			{!isLabelHidden && <span>{label}</span>}
			{!isErrorHidden && hasError && <span>{error as string}</span>}
		</label>
	);
};

export { Checkbox };
