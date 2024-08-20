import { ApplicationError } from "../../../../../../libs/exceptions/exceptions.js";
import { type ValueOf } from "../../../../../../libs/types/types.js";
import { type HTTPCode } from "../../enums/enums.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends ApplicationError {
	public status: ValueOf<typeof HTTPCode>;

	public constructor({ cause, message, status }: Constructor) {
		super({
			cause,
			message,
		});

		this.status = status;
	}
}

export { HTTPError };
