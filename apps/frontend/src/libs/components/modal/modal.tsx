import { type ReactNode, useRef } from "react";

import crossIconSrc from "~/assets/images/icons/cross.svg";
import { useHandleClickOutside } from "~/libs/hooks/hooks.js";

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
		<dialog
			aria-label={title}
			className={styles["modal-container"]}
			ref={dialogReference}
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
