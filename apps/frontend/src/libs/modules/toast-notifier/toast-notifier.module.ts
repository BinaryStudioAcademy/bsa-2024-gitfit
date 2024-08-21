import { toast } from "react-toastify";

import { type ToastNotifier as ToastNotifierInterface } from "./libs/types/types.js";

class ToastNotifier implements ToastNotifierInterface {
	public showError(message: string): void {
		toast.error(message);
	}

	public showInfo(message: string): void {
		toast.info(message);
	}

	public showSuccess(message: string): void {
		toast.success(message);
	}

	public showWarning(message: string): void {
		toast.warning(message);
	}
}

export { ToastNotifier };
