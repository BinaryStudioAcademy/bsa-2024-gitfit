import {
	useHandleClickOutside,
	usePopoverPosition,
	useRef,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
	usePositioning?: boolean;
};

const Popover = ({
	children,
	content,
	isOpened,
	onClose,
	usePositioning,
}: Properties): JSX.Element => {
	const popoverReference = useRef<HTMLDivElement>(null);
	const popoverTargetReference = useRef<HTMLDivElement>(null);

	const position = usePopoverPosition(
		popoverTargetReference,
		isOpened,
		usePositioning,
	);

	useHandleClickOutside(popoverReference, onClose);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			{children}

			{isOpened && (
				<div
					className={styles["popover-content-wrapper"]}
					ref={popoverTargetReference}
				>
					<div
						className={styles["popover-content"]}
						style={{
							left: position.left,
							top: position.top,
						}}
					>
						{content}
					</div>
				</div>
			)}
		</div>
	);
};

export { Popover };
