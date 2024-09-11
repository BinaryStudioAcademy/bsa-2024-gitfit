import { useEffect, useState } from "~/libs/hooks/hooks.js";

type Properties<T extends HTMLElement> = {
	hasFixedPositioning?: boolean;
	isOpen: boolean;
	reference: React.RefObject<T>;
};

type ReturnValue = {
	left?: number;
	top?: number;
};

const usePopoverPosition = <T extends HTMLElement>({
	hasFixedPositioning = false,
	isOpen,
	reference,
}: Properties<T>): ReturnValue => {
	const [position, setPosition] = useState<ReturnValue>({});

	useEffect(() => {
		if (!hasFixedPositioning || !reference.current) {
			return;
		}

		const { left, top } = reference.current.getBoundingClientRect();
		const scrollOffset = document.documentElement.scrollTop;

		setPosition({
			left,
			top: top + scrollOffset,
		});
	}, [reference, isOpen, hasFixedPositioning]);

	return position;
};

export { usePopoverPosition };
