import React, { type ReactNode, useCallback } from "react";

import "./modal.css";

interface ModalProperties {
	children: ReactNode;
	onClose: () => void;
	title: string;
}

const Modal: React.FC<ModalProperties> = ({ children, onClose, title }) => {
	const handleOverlayClick = useCallback(
		(clickEvent: React.MouseEvent<HTMLDivElement>): void => {
			if (clickEvent.target === clickEvent.currentTarget) {
				onClose();
			}
		},
		[onClose],
	);

	const handleOverlayKeyDown = useCallback(
		(keyEvent: React.KeyboardEvent<HTMLDivElement>): void => {
			if (
				keyEvent.key === "Escape" ||
				keyEvent.key === "Enter" ||
				keyEvent.key === " "
			) {
				onClose();
			}
		},
		[onClose],
	);

	return (
		<div
			aria-label="Close Modal"
			className="modal-overlay"
			onClick={handleOverlayClick}
			onKeyDown={handleOverlayKeyDown}
			role="button"
			tabIndex={0}
		>
			<div className="modal-content">
				<div className="modal-header">
					<h2>{title}</h2>
					<button className="modal-close" onClick={onClose}>
						×
					</button>
				</div>
				<div className="modal-body">{children}</div>
			</div>
		</div>
	);
};

export { Modal };
