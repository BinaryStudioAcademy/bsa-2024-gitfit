import { useEffect, useState } from "~/libs/hooks/hooks.js";

type Properties = {
	left: number;
	top: number;
};

const usePopoverPosition = <T extends HTMLElement>(
	reference: React.RefObject<T>,
	isActive: boolean,
): Properties => {
	const [position, setPosition] = useState<Properties>({ left: 0, top: 0 });

	useEffect(() => {
		if (reference.current && isActive) {
			const targetRect = reference.current.getBoundingClientRect();
			const { left, top } = targetRect;

			setPosition({ left, top });
		}
	}, [reference, isActive]);

	return position;
};

export { usePopoverPosition };
