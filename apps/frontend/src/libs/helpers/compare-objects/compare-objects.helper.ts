const compareObjects = <T extends Record<string, unknown>>(
	object1: T,
	object2: T,
): boolean => {
	if (object1 === object2) {
		return true;
	}

	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		const value1 = object1[key];
		const value2 = object2[key];

		const areObjects = isPlainObject(value1) && isPlainObject(value2);

		if (
			(areObjects && !compareObjects(value1, value2)) ||
			(!areObjects && value1 !== value2)
		) {
			return false;
		}
	}

	return true;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === "object" && value !== null && !Array.isArray(value);
};

export { compareObjects };
