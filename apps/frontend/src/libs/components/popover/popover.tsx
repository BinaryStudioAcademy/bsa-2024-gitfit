import {
	useCallback,
	useHandleClickOutside,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
};

const Popover = ({ children, content }: Properties): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const popoverReference = useRef<HTMLDivElement>(null);

	const handleToggle = useCallback((): void => {
		setIsOpened((previousState) => !previousState);
	}, []);

	const handleClose = (): void => {
		setIsOpened(false);
	};

	useHandleClickOutside(popoverReference, handleClose);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			<button className={styles["trigger-wrapper"]} onClick={handleToggle}>
				{children}
			</button>
			{isOpened && (
				<div className={styles["popover-content-wrapper"]}>{content}</div>
			)}
		</div>
	);
};

export { Popover };
