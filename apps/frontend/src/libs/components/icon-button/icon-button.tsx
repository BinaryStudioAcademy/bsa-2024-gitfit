import { Icon } from "~/libs/components/components.js";
import { IconSize } from "~/libs/enums/icon-size.enum.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { type IconName } from "../icon/libs/types/types.js";
import { type ButtonVariant } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	iconName: IconName;
	isDisabled?: boolean;
	label: string;
	onClick: () => void;
	variant?: ButtonVariant;
};

const IconButton = ({
	iconName,
	isDisabled = false,
	label,
	onClick,
	variant = "primary",
}: Properties): JSX.Element => {
	const isOutlined = variant === "outlined";
	const buttonClasses = getValidClassNames({
		[styles["icon-button"] as string]: true,
		[styles["outlined"] as string]: isOutlined,
	});

	return (
		<button
			aria-label={label}
			className={buttonClasses}
			disabled={isDisabled}
			onClick={onClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			<Icon
				height={IconSize.DEFAULT}
				name={iconName}
				width={IconSize.DEFAULT}
			/>
		</button>
	);
};

export { IconButton };
