const calculateTotalPages = (pageSize: number, totalItems: number): number =>
	Math.ceil(totalItems / pageSize);

export { calculateTotalPages };
