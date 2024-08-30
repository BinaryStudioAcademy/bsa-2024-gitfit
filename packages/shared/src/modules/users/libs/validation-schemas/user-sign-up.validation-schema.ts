import { z } from "zod";

import { UserValidationMessage, UserValidationRule } from "../enums/enums.js";
import { type UserSignUpRequestDto } from "../types/types.js";

const userSignUp: z.ZodType<UserSignUpRequestDto> = z
	.object({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_REQUIRED,
			})
			.max(UserValidationRule.EMAIL_MAXIMUM_LENGTH, {
				message: UserValidationMessage.EMAIL_TOO_LONG,
			})
			.refine(
				(email) => {
					const [localPart, domainPart] = email.split("@");

					return (
						!!localPart &&
						!!domainPart &&
						UserValidationRule.EMAIL_LOCAL_PART_PATTERN.test(localPart) &&
						UserValidationRule.EMAIL_DOMAIN_PART_PATTERN.test(domainPart)
					);
				},
				{
					message: UserValidationMessage.EMAIL_WRONG,
				},
			),
		name: z
			.string()
			.trim()
			.min(UserValidationRule.NAME_MINIMUM_LENGTH, {
				message: UserValidationMessage.NAME_TOO_SHORT,
			})
			.max(UserValidationRule.NAME_MAXIMUM_LENGTH, {
				message: UserValidationMessage.NAME_TOO_LONG,
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			})
			.max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_TOO_LONG,
			})
			.refine(
				(password) =>
					UserValidationRule.PASSWORD_UPPERCASE_PATTERN.test(password),
				{
					message: UserValidationMessage.PASSWORD_UPPERCASE_REQUIRED,
				},
			)
			.refine(
				(password) =>
					UserValidationRule.PASSWORD_LOWERCASE_PATTERN.test(password),
				{
					message: UserValidationMessage.PASSWORD_LOWERCASE_REQUIRED,
				},
			)
			.refine(
				(password) => UserValidationRule.PASSWORD_NUMBER_PATTERN.test(password),
				{
					message: UserValidationMessage.PASSWORD_NUMBER_REQUIRED,
				},
			)
			.refine(
				(password) =>
					UserValidationRule.PASSWORD_SPECIAL_CHAR_PATTERN.test(password),
				{
					message: UserValidationMessage.PASSWORD_SPECIAL_CHAR_REQUIRED,
				},
			),
	})
	.required();

export { userSignUp };
