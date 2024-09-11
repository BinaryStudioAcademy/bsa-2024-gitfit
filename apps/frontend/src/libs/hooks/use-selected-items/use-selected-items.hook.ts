import { useState } from "../hooks.js";

type UseSelectedItemsHook<T> = {
	items: T[];
	onToggle: (id: T) => void;
};

const useSelectedItems = <T>(
	initialItems: T[] = [],
): UseSelectedItemsHook<T> => {
	const [selectedItems, setSelectedItems] = useState<T[]>(initialItems);

	const handleAdd = (id: T): void => {
		setSelectedItems((previousState) => [...previousState, id]);
	};

	const handleRemove = (id: T): void => {
		setSelectedItems((previousState) =>
			previousState.filter((item) => item !== id),
		);
	};

	const handleToggle = (id: T): void => {
		if (selectedItems.includes(id)) {
			handleRemove(id);
		} else {
			handleAdd(id);
		}
	};

	return { items: selectedItems, onToggle: handleToggle };
};

export { useSelectedItems };
