import { NavLink } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	href?: string | undefined;
	isDisabled?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button = ({
	href,
	isDisabled = false,
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
		<button className={styles["button"]} disabled={isDisabled} type={type}>
			{label}
		</button>
	);
};

export { Button };
