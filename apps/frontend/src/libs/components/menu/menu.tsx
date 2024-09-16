import { IconButton, Popover } from "~/libs/components/components.js";
import { useRef } from "~/libs/hooks/hooks.js";

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
	const menuReference = useRef<HTMLButtonElement>(null);

	return (
		<>
			<IconButton
				iconName="ellipsis"
				label="options"
				onClick={isOpened ? onClose : onOpen}
				reference={menuReference}
			/>
			<Popover
				isOpened={isOpened}
				onClose={onClose}
				targetReference={menuReference}
			>
				<div className={styles["menu-options"]}>
					<div className={styles["options-content"]}>{children}</div>
				</div>
			</Popover>
		</>
	);
};

export { Menu };
