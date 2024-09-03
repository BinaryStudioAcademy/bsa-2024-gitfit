const UserValidationRule = {
	EMAIL_MAXIMUM_LENGTH: 50,
	EMAIL_MINIMUM_LENGTH: 6,
	LATIN_PATTERN: /^[\w!"#$%&'()*+,./:;<=>?@[\]^`{|}~-]*$/,
	NAME_MAXIMUM_LENGTH: 50,
	NAME_MINIMUM_LENGTH: 3,
	PASSWORD_LOWERCASE_PATTERN: /[a-z]/,
	PASSWORD_MAXIMUM_LENGTH: 50,
	PASSWORD_MINIMUM_LENGTH: 5,
	PASSWORD_NUMBER_PATTERN: /\d/,
	PASSWORD_SPECIAL_CHAR_PATTERN: /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]/,
	PASSWORD_UPPERCASE_PATTERN: /[A-Z]/,
} as const;

export { UserValidationRule };
