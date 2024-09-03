import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { type IconName } from "../icon/libs/types/types.js";
import { ICON_SIZE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	iconName: IconName;
	label: string;
	onClick: () => void;
	variant?: "danger" | "primary";
};

const MenuItem = ({
	iconName,
	label,
	onClick,
	variant = "primary",
}: Properties): JSX.Element => {
	const buttonClassName = getValidClassNames(
		styles["project-menu-item"],
		styles[`project-menu-item--${variant}`],
	);

	return (
		<button
			aria-label={label}
			className={buttonClassName}
			onClick={onClick}
			type="button"
		>
			<Icon height={ICON_SIZE} name={iconName} width={ICON_SIZE} />
			<span className={styles["project-menu-item-text"]}>{label}</span>
		</button>
	);
};

export { MenuItem };
