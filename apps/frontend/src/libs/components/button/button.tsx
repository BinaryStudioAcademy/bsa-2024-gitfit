import styles from "./button.module.css";

type Properties = {
	label: string;
	type?: "button" | "submit";
};

const Button = ({ label, type = "button" }: Properties): JSX.Element => (
	<button className={styles["button"]} type={type}>
		{label}
	</button>
);

export { Button };
