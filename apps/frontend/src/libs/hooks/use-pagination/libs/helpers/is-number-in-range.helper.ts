type Range = {
	max?: number;
	min?: number;
};

const isNumberInRange = (number: number, { max, min }: Range): boolean => {
	const outOfRange =
		(min !== undefined && number < min) || (max !== undefined && number > max);

	return !outOfRange;
};

export { isNumberInRange };
