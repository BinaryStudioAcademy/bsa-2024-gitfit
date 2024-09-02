import { NavLink } from "react-router-dom";

import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	href?: string | undefined;
	label: string;
	onClick?: () => void;
	type?: "button" | "submit";
	variant?: "danger" | "default" | "outlined";
};

const Button = ({
	href,
	label,
	onClick,
	type = "button",
	variant = "default",
}: Properties): JSX.Element => {
	const buttonClassName = getValidClassNames(
		styles["button"],
		styles[`button-${variant}`],
	);

	if (href) {
		return (
			<NavLink className={buttonClassName} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={buttonClassName} onClick={onClick} type={type}>
			{label}
		</button>
	);
};

export { Button };
