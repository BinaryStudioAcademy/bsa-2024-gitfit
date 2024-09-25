import { type ComponentProps } from "react";

import { IconButton, Popover } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	buttonVariant?: ComponentProps<typeof IconButton>["variant"];
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const Menu = ({
	buttonVariant = "primary",
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
				variant={buttonVariant}
			/>
		</Popover>
	);
};

export { Menu };
