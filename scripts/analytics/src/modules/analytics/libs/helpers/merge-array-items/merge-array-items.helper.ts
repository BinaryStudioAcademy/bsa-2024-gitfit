const mergeArrayItems = <T>(
	items: T[],
	compareFunction: (item1: T, item2: T) => boolean,
	mergeFunction: (mergedItem: T, item: T) => void,
): T[] => {
	const mergedItems: T[] = [];

	for (const item of items) {
		const mergedItem = mergedItems.find((mergedItem) =>
			compareFunction(mergedItem, item),
		);

		if (mergedItem) {
			mergeFunction(mergedItem, item);
		} else {
			mergedItems.push(item);
		}
	}

	return mergedItems;
};

export { mergeArrayItems };
