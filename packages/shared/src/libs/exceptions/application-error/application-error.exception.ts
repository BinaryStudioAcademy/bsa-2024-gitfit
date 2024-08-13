type Constructor = {
	cause?: unknown;
	message: string;
};

class ApplicationError extends Error {
	public constructor({ cause, message }: Constructor) {
		super(message, {
			cause,
		});
	}
}

export { ApplicationError };
