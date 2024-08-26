import { type RefObject, useLayoutEffect } from "react";

type Parameters = {
	callback: () => void;
	ref: RefObject<HTMLElement>;
};

const useOnClickOutside = ({ callback, ref }: Parameters): void => {
	useLayoutEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
};

export { useOnClickOutside };
