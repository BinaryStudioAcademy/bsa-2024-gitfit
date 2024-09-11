const UserValidationRule = {
	EMAIL_MAXIMUM_LENGTH: 50,
	EMAIL_MINIMUM_LENGTH: 6,
	NAME_MAXIMUM_LENGTH: 50,
	NAME_MINIMUM_LENGTH: 3,
	NAME_PATTERN: /^[\sA-Za-z-]*$/,
	PASSWORD_MAXIMUM_LENGTH: 50,
	PASSWORD_MINIMUM_LENGTH: 5,
	PASSWORD_PATTERN:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&()*+,.=?@^_-])[\d!#$%-_a-z]*$/,
} as const;

export { UserValidationRule };
