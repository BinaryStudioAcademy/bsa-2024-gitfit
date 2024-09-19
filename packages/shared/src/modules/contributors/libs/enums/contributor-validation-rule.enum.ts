const ContributorValidationRule = {
	NAME_MAXIMUM_LENGTH: 50,
	NAME_MINIMUM_LENGTH: 3,
	NAME_PATTERN: /^[\sA-Za-z-]*$/,
} as const;

export { ContributorValidationRule };
