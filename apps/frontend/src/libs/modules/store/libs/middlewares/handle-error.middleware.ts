import { isRejected, type Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const handleError: Middleware = () => {
	return (next) => (action) => {
		if (isRejected(action)) {
			toast.error(action.error.message);
		}

		return next(action);
	};
};

export { handleError };
