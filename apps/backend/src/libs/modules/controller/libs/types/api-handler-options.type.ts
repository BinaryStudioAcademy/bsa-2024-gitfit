type DefaultApiHandlerOptions = {
	body?: unknown;
	headers?: unknown;
	params?: unknown;
	query?: unknown;
	user?: unknown;
};

type APIHandlerOptions<
	T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
	body: T["body"];
	headers: T["headers"];
	params: T["params"];
	query: T["query"];
	user: T["user"];
};

export { type APIHandlerOptions };
