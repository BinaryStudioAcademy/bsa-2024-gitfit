import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	icon: JSX.Element;
	label: string;
	onClick: () => void;
};

const IconButton = ({
	className = "",
	icon,
	label,
	onClick,
}: Properties): JSX.Element => {
	return (
		<button
			aria-label={label}
			className={getValidClassNames(styles["icon-button"], className)}
			onClick={onClick}
			type="button"
		>
			<span className="visually-hidden">{label}</span>
			{icon}
		</button>
	);
};

export { IconButton };
