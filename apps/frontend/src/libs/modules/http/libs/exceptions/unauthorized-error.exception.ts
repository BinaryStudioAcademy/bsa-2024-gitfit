import { HTTPError as LibraryHTTPError } from "@git-fit/shared";

import { ServerErrorType } from "~/libs/enums/enums.js";
import { type ServerErrorDetail, type ValueOf } from "~/libs/types/types.js";

import { ExceptionName, HTTPCode } from "../enums/enums.js";

type Constructor = {
	cause?: unknown;
	details: ServerErrorDetail[];
	message: string;
};

class UnauthorizedError extends LibraryHTTPError {
	public details: ServerErrorDetail[];

	public errorType: ValueOf<typeof ServerErrorType>;

	public name: string;

	public constructor({ cause, details, message }: Constructor) {
		super({
			cause,
			message,
			status: HTTPCode.UNAUTHORIZED,
		});

		this.details = details;

		this.errorType = ServerErrorType.COMMON;

		this.name = ExceptionName.UNAUTHORIZED;
	}
}

export { UnauthorizedError };
