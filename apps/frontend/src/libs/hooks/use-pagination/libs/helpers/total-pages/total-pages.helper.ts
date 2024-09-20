import { FIRST_PAGE } from "../../constants/constants.js";

const calculateTotalPages = (pageSize: number, totalItems: number): number =>
	Math.max(FIRST_PAGE, Math.ceil(totalItems / pageSize));
export { calculateTotalPages };
