type ToastNotifier = {
	showError(message: string): void;
	showInfo(message: string): void;
	showSuccess(message: string): void;
	showWarning(message: string): void;
};

export { type ToastNotifier };
