type HTTPApiResponse = {
	json<T = unknown>(): never | Promise<T>;
} & Response;

export { type HTTPApiResponse };
