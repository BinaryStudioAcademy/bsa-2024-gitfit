import { type ClassValue, clsx } from "clsx";

const getValidClassNames = (...inputs: ClassValue[]): string => {
	return clsx(...inputs);
};

export { getValidClassNames };
