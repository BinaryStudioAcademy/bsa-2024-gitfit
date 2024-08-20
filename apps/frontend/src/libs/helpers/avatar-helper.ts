const ZERO = 0;

function getAvatarInitials(name: null | string | undefined): string {
	if (!name || name.trim().length === ZERO) {
		return "";
	}

	return name.trim().charAt(ZERO).toUpperCase();
}

export { getAvatarInitials };
