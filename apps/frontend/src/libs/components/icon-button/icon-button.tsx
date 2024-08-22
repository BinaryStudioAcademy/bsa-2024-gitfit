import { Icon } from "~/libs/components/components.js";

import { type IconName } from "../icon/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	iconHeight: number;
	iconName: IconName;
	iconWidth: number;
	label: string;
	onClick: () => void;
};

const IconButton = ({
	iconHeight,
	iconName,
	iconWidth,
	label,
	onClick,
}: Properties): JSX.Element => {
	return (
		<button
			aria-label={label}
			className={styles["icon-button"]}
			onClick={onClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			<Icon height={iconHeight} name={iconName} width={iconWidth} />
		</button>
	);
};

export { IconButton };
