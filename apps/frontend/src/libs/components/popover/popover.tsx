import {
	useCallback,
	useOnClickOutside,
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
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const popoverReference = useRef<HTMLDivElement>(null);

	const handleOpen = useCallback((): void => {
		setIsOpen(true);
	}, []);

	const handleClose = (): void => {
		setIsOpen(false);
	};

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>): void => {
			if (event.key === ESCAPE_KEY) {
				handleClose();
			}
		},
		[],
	);

	useOnClickOutside({
		callback: handleClose,
		ref: popoverReference,
	});

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
			{isOpen && (
				<div className={styles["popover-content-wrapper"]}>{content}</div>
			)}
		</div>
	);
};

export { Popover };
