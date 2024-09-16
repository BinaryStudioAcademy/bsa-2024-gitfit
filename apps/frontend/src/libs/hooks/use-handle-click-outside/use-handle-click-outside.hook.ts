import { useEffect } from "~/libs/hooks/hooks.js";

const useHandleClickOutside = <T extends HTMLElement>(
	references: React.RefObject<T>[],
	onOutsideClick: () => void,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				!references.some(
					(reference) =>
						reference.current &&
						reference.current.contains(event.target as Node),
				)
			) {
				onOutsideClick();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
	}, [references, onOutsideClick]);
};

export { useHandleClickOutside };
