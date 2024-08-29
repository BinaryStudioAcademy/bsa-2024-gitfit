import { useHandleClickOutside, useRef, useState } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
};

const Popover = ({ children, content }: Properties): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(true);
	const popoverReference = useRef<HTMLDivElement>(null);

	const handleClose = (): void => {
		setIsOpened(false);
	};

	useHandleClickOutside(popoverReference, handleClose);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			<div>{children}</div>
			{isOpened && (
				<div className={styles["popover-content-wrapper"]}>{content}</div>
			)}
		</div>
	);
};

export { Popover };
