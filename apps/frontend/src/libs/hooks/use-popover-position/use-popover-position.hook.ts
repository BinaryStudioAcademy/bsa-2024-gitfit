import { useEffect, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	top?: number;
};

const usePopoverPosition = <T extends HTMLElement>(
	reference: React.RefObject<T>,
	isOpen: boolean,
	hasPositioning: boolean = false,
): Properties => {
	const [position, setPosition] = useState<Properties>({});

	useEffect(() => {
		if (!hasPositioning || !isOpen || !reference.current) {
			setPosition({});

			return;
		}

		const { top } = reference.current.getBoundingClientRect();
		const scrollOffset = window.scrollY || document.documentElement.scrollTop;

		setPosition({
			top: top + scrollOffset,
		});
	}, [reference, isOpen, hasPositioning]);

	return position;
};

export { usePopoverPosition };
