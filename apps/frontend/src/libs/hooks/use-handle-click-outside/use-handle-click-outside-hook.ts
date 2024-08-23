import { type RefObject, useEffect } from "react";

// The hook itself doesn't return anything (void return type)
function useHandleClickOutside<T extends HTMLElement>(
	reference: RefObject<T>,
	onClick: () => void,
): void {
	useEffect(() => {
		// handleClickOutside function, which also has a void return type
		function handleClickOutside(event: MouseEvent): void {
			if (
				reference.current &&
				!reference.current.contains(event.target as Node)
			) {
				onClick();
			}
		}

		// Add event listener to document
		document.addEventListener("mousedown", handleClickOutside);

		// The cleanup function of useEffect also has a void return type
		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [reference, onClick]);
}

export { useHandleClickOutside };
