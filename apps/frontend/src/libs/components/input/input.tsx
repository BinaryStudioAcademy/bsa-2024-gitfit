import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	autoComplete?: string;
	control: Control<T, null>;
	disabled?: boolean;
	errors: FieldErrors<T>;
	label: string;
	leftIcon?: JSX.Element;
	name: FieldPath<T>;
	placeholder?: string;
	rightIcon?: JSX.Element;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	autoComplete,
	control,
	disabled,
	errors,
	label,
	leftIcon,
	name,
	placeholder = "",
	rightIcon,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const hasLeftIcon = Boolean(leftIcon);
	const hasRightIcon = Boolean(rightIcon);
	const inputClassNames = getValidClassNames(
		styles["input-field"],
		hasLeftIcon && styles["with-left-icon"],
		hasRightIcon && styles["with-right-icon"],
	);

	return (
		<label className={styles["input-label"]}>
			<span className={styles["input-label-text"]}>{label}</span>
			<div className={styles["input-container"]}>
				{hasLeftIcon && (
					<div
						className={getValidClassNames(
							styles["input-icon"],
							styles["input-icon-left"],
						)}
					>
						{leftIcon}
					</div>
				)}

				<input
					autoComplete={autoComplete}
					className={inputClassNames}
					disabled={disabled}
					name={field.name}
					onChange={field.onChange}
					placeholder={placeholder}
					type={type}
					value={field.value}
				/>

				{hasRightIcon && (
					<div
						className={getValidClassNames(
							styles["input-icon"],
							styles["input-icon-right"],
						)}
					>
						{rightIcon}
					</div>
				)}
			</div>

			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
