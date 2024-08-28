import {
	useCallback,
	useHandleClickOutside,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const ESCAPE_KEY = "Escape";

type Properties = {
	children: React.ReactNode;
	content: React.ReactNode;
};

const Popover = ({ children, content }: Properties): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const popoverReference = useRef<HTMLDivElement>(null);

	const handleOpen = useCallback((): void => {
		setIsOpened(true);
	}, []);

	const handleClose = (): void => {
		setIsOpened(false);
	};

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>): void => {
			if (event.key === ESCAPE_KEY) {
				handleClose();
			}
		},
		[],
	);

	useHandleClickOutside(popoverReference, handleClose);

	return (
		<div className={styles["popover-wrapper"]} ref={popoverReference}>
			<div
				onClick={handleOpen}
				onKeyDown={handleKeyDown}
				role="button"
				tabIndex={0}
			>
				{children}
			</div>
			{isOpened && (
				<div className={styles["popover-content-wrapper"]}>{content}</div>
			)}
		</div>
	);
};

export { Popover };
