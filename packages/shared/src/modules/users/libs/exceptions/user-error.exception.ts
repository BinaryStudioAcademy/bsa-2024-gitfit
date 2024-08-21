import { type ValueOf } from "src/libs/types/types.js";

import {
	type HTTPCode,
	HTTPError,
} from "../../../../libs/modules/http/http.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class UserError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({
			cause,
			message,
			status,
		});
	}
}

export { UserError };
