import { useEffect } from "~/libs/hooks/hooks.js";

const useHandleClickOutside = <T extends HTMLElement>(
	reference: React.RefObject<T>,
	onOutsideClick: () => void,
	contentReference?: React.RefObject<T>,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (contentReference && !contentReference.current) {
				return;
			}

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

export { useHandleClickOutside };
