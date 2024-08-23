import { IconButton } from "~/libs/components/components.js";
import { type IconName } from "~/libs/components/icon/types/types.js";

type Properties = {
	disabled?: boolean;
	iconName: IconName;
	label: string;
	onClick: () => void;
};

const ChangePageButton = ({
	disabled = false,
	iconName,
	label,
	onClick,
}: Properties): JSX.Element => {
	return (
		<IconButton
			disabled={disabled}
			iconColor="textPrimary"
			iconName={iconName}
			label={label}
			onClick={onClick}
			variant="outlined"
		/>
	);
};

export { ChangePageButton };
