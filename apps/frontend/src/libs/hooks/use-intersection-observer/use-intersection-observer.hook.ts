import { useEffect, useRef } from "~/libs/hooks/hooks.js";

const FIRST_ITEM = 0;

type Properties = {
	isDisabled?: boolean;
	onIntersect: () => void;
	root?: Element | null;
	rootMargin?: string;
	threshold?: number;
};

const useIntersectionObserver = <T extends HTMLElement>({
	isDisabled = false,
	onIntersect,
}: Properties): React.MutableRefObject<null | T> => {
	const sentinelReference = useRef<null | T>(null);

	useEffect(() => {
		if (isDisabled || !sentinelReference.current) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]): void => {
				const firstEntry = entries[FIRST_ITEM];
				const isIntersecting = firstEntry?.isIntersecting;

				if (isIntersecting) {
					onIntersect();
				}
			},
		);

		const sentinel = sentinelReference.current;
		observer.observe(sentinel);

		return (): void => {
			observer.unobserve(sentinel);
		};
	}, [isDisabled, onIntersect]);

	return sentinelReference;
};

export { useIntersectionObserver };
