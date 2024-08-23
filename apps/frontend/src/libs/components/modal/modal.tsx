import { type ReactNode, useEffect, useRef } from "react";

import crossIconSrc from "~/assets/images/icons/cross.svg";

import styles from "./modal.module.css";

type Properties = {
	children: ReactNode;
	onClose: () => void;
	open: boolean;
	title: string;
};

const Modal = ({ children, onClose, open, title }: Properties): JSX.Element => {
	const dialogReference_ = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogReference_.current;

		if (dialog) {
			if (open) {
				dialog.showModal();
			} else {
				dialog.close();
			}

			const handleClickOutside = (event: MouseEvent): void => {
				if (event.target === dialog) {
					onClose();
				}
			};

			dialog.addEventListener("click", handleClickOutside);

			return (): void => {
				dialog.removeEventListener("click", handleClickOutside);
			};
		}
	}, [open, onClose]);

	return (
		<dialog
			aria-label={title}
			className={styles["modal-container"]}
			ref={dialogReference_}
		>
			<div className={styles["modal-content"]}>
				<div className={styles["modal-header-title"]}>
					<h2>{title}</h2>
					<button className={styles["modal-close"]} onClick={onClose}>
						<img alt="Close" height="20" src={crossIconSrc} width="20" />
					</button>
				</div>
				<div className={styles["modal-body"]}>{children}</div>
			</div>
		</dialog>
	);
};

export { Modal };
