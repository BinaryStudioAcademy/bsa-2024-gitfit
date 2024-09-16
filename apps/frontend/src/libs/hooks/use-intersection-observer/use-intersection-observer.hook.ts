import { useEffect, useRef } from "~/libs/hooks/hooks.js";

type Properties = {
	isDisabled?: boolean;
	onIntersect: () => void;
};

const useIntersectionObserver = <T extends HTMLElement>({
	isDisabled = false,
	onIntersect,
}: Properties): {
	reference: React.MutableRefObject<null | T>;
} => {
	const sentinelReference = useRef<null | T>(null);

	useEffect(() => {
		if (isDisabled || !sentinelReference.current) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]): void => {
				const [entry] = entries;
				const isIntersecting = entry?.isIntersecting;

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

	return {
		reference: sentinelReference,
	};
};

export { useIntersectionObserver };
