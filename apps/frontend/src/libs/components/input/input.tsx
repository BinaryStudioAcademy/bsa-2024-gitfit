import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./input.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	icon?: JSX.Element;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	icon,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={styles["input-label"]}>
			<span className={styles["input-label-text"]}>{label}</span>
			<div className={styles["input-container"]}>
				<input
					{...field}
					className={styles["input-field"]}
					placeholder={placeholder}
					type={type}
				/>
				{icon && <div className={styles["input-icon"]}>{icon}</div>}
			</div>
			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
