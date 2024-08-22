import React, { type ReactNode } from "react";

import styles from "./modal.module.css";

type Properties = {
	children: ReactNode;
	onClose: () => void;
	title: string;
};

const handleOverlayClick =
	(onClose: () => void) =>
	(clickEvent: React.MouseEvent<HTMLDivElement>): void => {
		if (clickEvent.target === clickEvent.currentTarget) {
			onClose();
		}
	};

const handleOverlayKeyDown =
	(onClose: () => void) =>
	(keyEvent: React.KeyboardEvent<HTMLDivElement>): void => {
		if (keyEvent.key === "Escape") {
			onClose();
		}
	};

const Modal: React.FC<Properties> = ({ children, onClose, title }) => {
	return (
		<div
			aria-label="Close Modal"
			className={styles["modalOverlay"]}
			onClick={handleOverlayClick(onClose)}
			onKeyDown={handleOverlayKeyDown(onClose)}
			role="button"
			tabIndex={0}
		>
			<div className={styles["modalContent"]}>
				<div className={styles["modalHeader"]}>
					<h2>{title}</h2>
					<button className={styles["modalClose"]} onClick={onClose}>
						×
					</button>
				</div>
				<div className={styles["modalBody"]}>{children}</div>
			</div>
		</div>
	);
};

export { Modal };
