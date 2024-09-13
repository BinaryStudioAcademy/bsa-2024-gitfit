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
	errors: FieldErrors<T>;
	isDisabled?: boolean;
	isLabelHidden?: boolean;
	isReadOnly?: boolean;
	label: string;
	leftIcon?: JSX.Element;
	name: FieldPath<T>;
	placeholder?: string;
	rightIcon?: JSX.Element;
	rowsCount?: number;
	type?: "email" | "password" | "search" | "text";
};

const Input = <T extends FieldValues>({
	autoComplete,
	control,
	errors,
	isDisabled = false,
	isLabelHidden = false,
	isReadOnly = false,
	label,
	leftIcon,
	name,
	placeholder = "",
	rightIcon,
	rowsCount,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const hasLeftIcon = Boolean(leftIcon);
	const hasRightIcon = Boolean(rightIcon);
	const isTextArea = Boolean(rowsCount);
	const inputClassNames = getValidClassNames(
		styles["input-field"],
		isTextArea && styles["input-textarea"],
		hasLeftIcon && styles["with-left-icon"],
		hasRightIcon && styles["with-right-icon"],
	);

	return (
		<label className={styles["input-label"]}>
			<span
				className={getValidClassNames(
					styles["input-label-text"],
					isLabelHidden && "visually-hidden",
				)}
			>
				{label}
			</span>
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

				{isTextArea ? (
					<textarea
						className={inputClassNames}
						disabled={isDisabled}
						name={field.name}
						onChange={field.onChange}
						placeholder={placeholder}
						readOnly={isReadOnly}
						rows={rowsCount}
						value={field.value}
					/>
				) : (
					<input
						autoComplete={autoComplete}
						className={inputClassNames}
						disabled={isDisabled}
						name={field.name}
						onChange={field.onChange}
						placeholder={placeholder}
						readOnly={isReadOnly}
						type={type}
						value={field.value}
					/>
				)}

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
