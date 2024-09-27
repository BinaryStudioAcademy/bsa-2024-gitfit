import { z } from "zod";

import { AuthAnalyticsValidationMessage } from "../enums/enums.js";
import { type AuthAnalyticsValidateCredentialsRequestDto } from "../types/types.js";

const authAnalyticsValidateCredentials: z.ZodType<AuthAnalyticsValidateCredentialsRequestDto> =
	z.object({
		userId: z
			.number({
				required_error: AuthAnalyticsValidationMessage.USER_ID_REQUIRED,
			})
			.int()
			.positive(),
	});

export { authAnalyticsValidateCredentials };
