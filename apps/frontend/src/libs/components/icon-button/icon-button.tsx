import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type Color } from "~/libs/types/types.js";

import { type IconName } from "../icon/libs/types/types.js";
import { ICON_SIZE } from "./libs/constants/constants.js";
import { type ButtonVariant } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	iconColor?: Color;
	iconName: IconName;
	label: string;
	onClick: () => void;
	variant?: ButtonVariant;
};

const IconButton = ({
	disabled = false,
	iconColor = "textSecondary",
	iconName,
	label,
	onClick,
	variant = "primary",
}: Properties): JSX.Element => {
	const hasBorder = variant === "outlined";
	const buttonClasses = getValidClassNames({
		[styles["icon-button"] ?? ""]: true,
		[styles["with-border"] ?? ""]: hasBorder,
	});

	return (
		<button
			aria-label={label}
			className={buttonClasses}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			<Icon
				color={iconColor}
				height={ICON_SIZE.HEIGHT}
				name={iconName}
				width={ICON_SIZE.WIDTH}
			/>
		</button>
	);
};

export { IconButton };
