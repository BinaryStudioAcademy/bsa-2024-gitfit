function isTokenExpiredError(error: Error): boolean {
	// eslint-disable-next-line quotes
	return error.message.includes('"exp" claim timestamp check failed');
}

export { isTokenExpiredError };
