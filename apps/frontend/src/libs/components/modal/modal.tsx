import { IconButton } from "~/libs/components/components.js";
import { useHandleClickOutside, useRef } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
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
					<div>
						<h3 className={styles["modal-title"]}>{title}</h3>
						<div className={styles["modal-close"]}>
							<IconButton iconName="cross" label="Close" onClick={onClose} />
						</div>
					</div>
					<div className={styles["modal-body"]}>{children}</div>
				</div>
			</dialog>
		</>
	);
};

export { Modal };
