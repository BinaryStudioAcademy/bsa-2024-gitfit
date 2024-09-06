const checkHasPermission = (
	requiredPermissions: string[],
	permissions: { key: string; name: string }[],
): boolean => {
	return requiredPermissions.every((permission) =>
		permissions.some((userPermission) => userPermission.key === permission),
	);
};

export { checkHasPermission };
