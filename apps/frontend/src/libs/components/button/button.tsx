import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	href?: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button = ({
	disabled = false,
	href,
	label,
	type = "button",
}: Properties): JSX.Element => {
	if (href) {
		return (
			<NavLink className={styles["button"] ?? ""} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={styles["button"]} disabled={disabled} type={type}>
			{label}
		</button>
	);
};

export { Button };
