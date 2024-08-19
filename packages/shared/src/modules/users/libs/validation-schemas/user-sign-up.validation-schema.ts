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
			.email({
				message: UserValidationMessage.EMAIL_WRONG,
			}),
		name: z.string().trim().min(UserValidationRule.NAME_MINIMUM_LENGTH, {
			message: UserValidationMessage.NAME_REQUIRED,
		}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
				message: UserValidationMessage.PASSWORD_MINIMUM_LENGTH,
			}),
	})
	.required();

export { userSignUp };
