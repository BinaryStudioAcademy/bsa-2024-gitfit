import { type ReactNode, useCallback, useEffect, useRef } from "react";

import styles from "./modal.module.css";

type Properties = {
	children: ReactNode;
	onClose: () => void;
	open: boolean;
	title: string;
};

const Modal = ({ children, onClose, open, title }: Properties): JSX.Element => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent): void => {
			const dialog = dialogReference.current;

			if (dialog && event.target === dialog) {
				onClose();
			}
		},
		[onClose],
	);

	useEffect((): (() => void) | undefined => {
		const dialog = dialogReference.current;

		if (open && dialog) {
			dialog.showModal();
			dialog.addEventListener("click", handleClickOutside);

			return () => {
				dialog.removeEventListener("click", handleClickOutside);
			};
		} else if (dialog) {
			dialog.close();
		}

		return undefined;
	}, [open, onClose, handleClickOutside]);

	return (
		<dialog
			aria-label={title}
			className={styles["modal-container"]}
			ref={dialogReference}
		>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header-title"]}>
					<h2>{title}</h2>
					<button className={styles["modal-close"]} onClick={onClose}>
						×
					</button>
				</div>
				<div className={styles["modal-body"]}>{children}</div>
			</div>
		</dialog>
	);
};

export { Modal };
