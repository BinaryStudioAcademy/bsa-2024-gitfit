import { NavLink } from "react-router-dom";

import styles from "./button.module.css";

type Properties = {
	href?: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button = ({ href, label, type = "button" }: Properties): JSX.Element => {
	const buttonClassName = styles["button"] || "";

	if (href) {
		return (
			<NavLink className={buttonClassName} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={buttonClassName} type={type}>
			{label}
		</button>
	);
};

export { Button };
