import { FIRST_PAGE } from "../constants/constants.js";

const calculateTotalPages = (pageSize: number, totalItems: number): number =>
	Math.max(FIRST_PAGE, Math.ceil(totalItems / pageSize)); // Ensures totalPages is at least 1

export { calculateTotalPages };
