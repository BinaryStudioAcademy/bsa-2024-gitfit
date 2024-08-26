import { IconButton } from "~/libs/components/components.js";
import { useHandleClickOutside, useRef } from "~/libs/hooks/hooks.js";
import { type ReactNode } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpened: boolean;
	onClose: () => void;
	title: string;
};

const Modal = ({
	children,
	isOpened,
	onClose,
	title,
}: Properties): JSX.Element | null => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	useHandleClickOutside(dialogReference, onClose);

	if (!isOpened) {
		return null;
	}

	return (
		<>
			<div className={styles["modal-backdrop"]} />

			<dialog
				aria-label={title}
				className={styles["modal-container"]}
				ref={dialogReference}
			>
				<div className={styles["modal-content"]}>
					<div className={styles["modal-header-title"]}>
						<h3>{title}</h3>
						<div className={styles["modal-close"]}>
							<IconButton
								iconHeight={11}
								iconName="cross"
								iconWidth={11}
								label="Close"
								onClick={onClose}
							/>
						</div>
					</div>
					<div className={styles["modal-body"]}>{children}</div>
				</div>
			</dialog>
		</>
	);
};

export { Modal };
