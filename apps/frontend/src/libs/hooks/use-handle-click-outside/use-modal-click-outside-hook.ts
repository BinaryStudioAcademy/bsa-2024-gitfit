import { type RefObject, useEffect } from "react";

const useHandleClickOutside = <T extends HTMLElement>(
	reference: RefObject<T>,
	onClick: () => void,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				onClick();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [reference, onClick]);
};

export { useHandleClickOutside };
