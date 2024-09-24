import { IconButton, Popover } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	buttonClassName?: string;
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const Menu = ({
	buttonClassName,
	children,
	isOpened,
	onClose,
	onOpen,
}: Properties): JSX.Element => {
	return (
		<Popover
			content={
				<div className={styles["menu-options"]}>
					<div className={styles["options-content"]}>{children}</div>
				</div>
			}
			isOpened={isOpened}
			onClose={onClose}
		>
			<IconButton
				{...(buttonClassName && { className: buttonClassName })}
				iconName="ellipsis"
				label="options"
				onClick={isOpened ? onClose : onOpen}
			/>
		</Popover>
	);
};

export { Menu };
