import styles from "./styles.module.css";

type Properties = {
	label: string;
	placeholder?: string;
	value: null | string;
};

const Output = ({
	label,
	placeholder = "No value",
	value,
}: Properties): JSX.Element => {
	const hasValue = Boolean(value);

	return (
		<div className={styles["container"]}>
			<p className={styles["label"]}>{label}</p>
			<div className={styles["field"]}>
				{hasValue ? (
					<span className={styles["value"]}>{value}</span>
				) : (
					<span className={styles["placeholder"]}>{placeholder}</span>
				)}
			</div>
		</div>
	);
};

export { Output };
