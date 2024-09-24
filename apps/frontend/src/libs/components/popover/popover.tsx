import { useHandleClickOutside, useRef } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
};

const Popover = ({
	children,
	content,
	isOpened,
	onClose,
}: Properties): JSX.Element => {
	const popoverReference = useRef<HTMLDivElement>(null);
	const popoverTargetReference = useRef<HTMLDivElement>(null);

	useHandleClickOutside(popoverReference, onClose, popoverTargetReference);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			{children}

			{isOpened && (
				<div
					className={styles["popover-content-wrapper"]}
					ref={popoverTargetReference}
				>
					<div className={styles["popover-content"]}>{content}</div>
				</div>
			)}
		</div>
	);
};

export { Popover };
