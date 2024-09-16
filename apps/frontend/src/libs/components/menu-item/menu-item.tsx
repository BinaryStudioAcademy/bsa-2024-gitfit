import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	iconName: IconName;
	label: string;
	onClick?: () => void;
	variant?: "danger" | "primary";
};

const MenuItem = ({
	iconName,
	label,
	onClick,
	variant = "primary",
}: Properties): JSX.Element => {
	const buttonClassName = getValidClassNames(
		styles["menu-item"],
		styles[`menu-item-${variant}`],
	);

	return (
		<button
			aria-label={label}
			className={buttonClassName}
			onClick={onClick}
			type="button"
		>
			<Icon height={20} name={iconName} width={20} />
			<span className={styles["menu-item-text"]}>{label}</span>
		</button>
	);
};

export { MenuItem };
