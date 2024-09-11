import { useEffect, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	left?: number;
	top?: number;
};

const usePopoverPosition = <T extends HTMLElement>(
	reference: React.RefObject<T>,
	isOpen: boolean,
	hasFixedPositioning: boolean = false,
): Properties => {
	const [position, setPosition] = useState<Properties>({});

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
