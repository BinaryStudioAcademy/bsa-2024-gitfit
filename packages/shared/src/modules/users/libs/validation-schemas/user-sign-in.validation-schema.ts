import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";
import { type UserSignInRequestDto } from "../types/types.js";

const userSignIn: z.ZodType<UserSignInRequestDto> = z
	.object({
		email: z
			.string()
			.trim()
			.regex(UserValidationRule.LATIN_PATTERN, {
				message: UserValidationMessage.ONLY_LATIN,
			})
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_TOO_SHORT,
			})
			.max(UserValidationRule.EMAIL_MAXIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_TOO_LONG,
			})
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		password: z
			.string()
			.trim()
			.regex(UserValidationRule.LATIN_PATTERN, {
				message: UserValidationMessage.ONLY_LATIN,
			})
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_TOO_LONG,
			})
			.regex(UserValidationRule.PASSWORD_UPPERCASE_PATTERN, {
				message: UserValidationMessage.PASSWORD_UPPERCASE_REQUIRED,
			})
			.regex(UserValidationRule.PASSWORD_LOWERCASE_PATTERN, {
				message: UserValidationMessage.PASSWORD_LOWERCASE_REQUIRED,
			})
			.regex(UserValidationRule.PASSWORD_NUMBER_PATTERN, {
				message: UserValidationMessage.PASSWORD_NUMBER_REQUIRED,
			})
			.regex(UserValidationRule.PASSWORD_SPECIAL_CHAR_PATTERN, {
				message: UserValidationMessage.PASSWORD_SPECIAL_CHAR_REQUIRED,
			}),
	})
	.required();

export { userSignIn };
