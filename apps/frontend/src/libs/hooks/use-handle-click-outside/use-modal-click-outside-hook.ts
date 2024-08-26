import { type RefObject, useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
	reference: RefObject<T>,
	onOutsideClick: () => void,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				onOutsideClick();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [reference, onOutsideClick]);
};

export { useClickOutside };
