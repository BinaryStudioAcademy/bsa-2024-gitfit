import {
	useCallback,
	useHandleClickOutside,
	useRef,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
	isPopoverOpened: boolean;
	onPopoverClose: () => void;
	onPopoverOpen: () => void;
};

const Popover = ({
	children,
	content,
	isPopoverOpened,
	onPopoverClose,
	onPopoverOpen,
}: Properties): JSX.Element => {
	const popoverReference = useRef<HTMLDivElement>(null);

	const handleToggle = useCallback((): void => {
		if (isPopoverOpened) {
			onPopoverClose();
		} else {
			onPopoverOpen();
		}
	}, [isPopoverOpened, onPopoverClose, onPopoverOpen]);

	useHandleClickOutside(popoverReference, onPopoverClose);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			<button className={styles["trigger-wrapper"]} onClick={handleToggle}>
				{children}
			</button>
			{isPopoverOpened && (
				<div className={styles["popover-content-wrapper"]}>{content}</div>
			)}
		</div>
	);
};

export { Popover };
