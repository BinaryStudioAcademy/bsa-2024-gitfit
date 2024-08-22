import { type ReactNode, useEffect, useRef } from "react";

import styles from "./modal.module.css";

type Properties = {
	children: ReactNode;
	onClose: () => void;
	open: boolean;
	title: string;
};

const Modal = ({ children, onClose, open, title }: Properties): JSX.Element => {
	const dialogReference = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			dialogReference.current?.showModal();
		} else {
			dialogReference.current?.close();
		}
	}, [open]);

	return (
		<dialog
			aria-label={title}
			className={styles["modal-overlay"]}
			ref={dialogReference}
		>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header"]}>
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
