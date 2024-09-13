type LogFunction = (
	message: string,
	parameters?: Record<string, unknown>,
) => void;

type Logger = {
	debug: LogFunction;
	error: LogFunction;
	info: LogFunction;
	warn: LogFunction;
};

export { type Logger };
