import { IconButton, Popover } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const Menu = ({
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
				iconName="ellipsis"
				label="options"
				onClick={isOpened ? onClose : onOpen}
			/>
		</Popover>
	);
};

export { Menu };
