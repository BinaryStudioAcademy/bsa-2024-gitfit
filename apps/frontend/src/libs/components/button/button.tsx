import { NavLink } from "react-router-dom";

import styles from "./button.module.css";

type Properties = {
	href?: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button = ({ href, label, type = "button" }: Properties): JSX.Element => {
	if (href) {
		return (
			<NavLink className={styles["button"] ?? ""} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={styles["button"]} type={type}>
			{label}
		</button>
	);
};

export { Button };
