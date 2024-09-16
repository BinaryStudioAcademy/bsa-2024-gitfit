import React from "react";

import {
	useEffect,
	useHandleClickOutside,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import { Portal } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpened: boolean;
	onClose: () => void;
	targetReference: React.RefObject<HTMLElement>;
};

type Position = {
	left?: number;
	top?: number;
};

const Popover = ({
	children,
	isOpened,
	onClose,
	targetReference,
}: Properties): JSX.Element => {
	const contentReference = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<Position>({});

	useHandleClickOutside([contentReference, targetReference], onClose);

	useEffect(() => {
		if (targetReference.current) {
			const { bottom, right } = targetReference.current.getBoundingClientRect();
			setPosition({
				left: right + window.scrollX,
				top: bottom + window.scrollY,
			});
		}
	}, [targetReference, isOpened]);

	if (!isOpened) {
		return <></>;
	}

	return (
		<Portal targetId="#popover-container">
			<div
				className={styles["popover-content"]}
				ref={contentReference}
				style={{
					left: position.left,
					top: position.top,
				}}
			>
				{children}
			</div>
		</Portal>
	);
};

export { Popover };
