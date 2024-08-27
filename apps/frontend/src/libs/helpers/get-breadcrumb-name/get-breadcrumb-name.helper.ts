const getBreadcrumbName = (name: string): string => {
	return (
		name
			.replaceAll("-", " ")
			// eslint-disable-next-line unicorn/prefer-string-replace-all
			.replace(/\b\w/g, (char) => char.toUpperCase())
	);
};

export { getBreadcrumbName };
