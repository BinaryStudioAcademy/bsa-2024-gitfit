import { toast } from "react-toastify";

const notifier = {
	error: (message?: string): void => void toast.error(message),
	info: (message?: string): void => void toast.info(message),
	success: (message?: string): void => void toast.success(message),
	warn: (message?: string): void => void toast.warn(message),
};

export { notifier };
