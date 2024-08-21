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
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	leftIcon?: JSX.Element;
	name: FieldPath<T>;
	placeholder?: string;
	rightIcon?: JSX.Element;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	control,
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

	const inputClassNames = getValidClassNames(
		styles["input-field"],
		leftIcon && styles["with-left-icon"],
		rightIcon && styles["with-right-icon"],
	);

	return (
		<label className={styles["input-label"]}>
			<span className={styles["input-label-text"]}>{label}</span>
			<div className={styles["input-container"]}>
				{leftIcon && (
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
					{...field}
					className={inputClassNames}
					placeholder={placeholder}
					type={type}
				/>

				{rightIcon && (
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
