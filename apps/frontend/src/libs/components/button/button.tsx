import { NavLink } from "react-router-dom";

import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	disabled?: boolean;
	href?: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button = ({
	className = "",
	disabled = false,
	href,
	label,
	type = "button",
}: Properties): JSX.Element => {
	const validClassName = getValidClassNames(styles["button"], className);

	if (href) {
		return (
			<NavLink className={validClassName} to={href}>
				{label}
			</NavLink>
		);
	}

	return (
		<button className={validClassName} disabled={disabled} type={type}>
			{label}
		</button>
	);
};

export { Button };
