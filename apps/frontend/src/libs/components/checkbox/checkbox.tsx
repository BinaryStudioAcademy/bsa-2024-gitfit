import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	id?: string;
	name: FieldPath<T>;
};

const Checkbox = <T extends FieldValues>({
	control,
	errors,
	id,
	name,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<>
			<input
				className={styles["checkbox"]}
				defaultChecked={field.value}
				id={id}
				name={name}
				onChange={field.onChange}
				type="checkbox"
			/>
			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</>
	);
};

export { Checkbox };
